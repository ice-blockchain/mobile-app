// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {EMAIL_CODE_GET_STATUS_INTERVAL_SEC} from '@constants/timeouts';
import {
  getConfirmationStatus,
  persistToken,
  sendCustomSignInLinkToEmail,
} from '@services/auth';
import {
  isValidationError,
  ValidationError,
  ValidationErrorCode,
} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {t} from '@translations/i18n';
import {validateEmail} from '@utils/email';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import jwt_decode from 'jwt-decode';
import {
  call,
  delay,
  put,
  race,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

export function* signInEmailCodeSaga(
  startAction: ReturnType<
    typeof AccountActions.SIGN_IN_EMAIL_CODE.START.create
  >,
) {
  try {
    const email = startAction.payload.email;
    if (!validateEmail(email)) {
      throw new ValidationError(ValidationErrorCode.InvalidEmail);
    }

    const deviceUniqueId: SagaReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);

    const language: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    const {loginSession}: SagaReturnType<typeof sendCustomSignInLinkToEmail> =
      yield call(sendCustomSignInLinkToEmail, {
        email,
        deviceUniqueId,
        language,
      });

    const loginSessionPayload = jwt_decode(loginSession);

    if (!checkProp(loginSessionPayload, 'confirmationCode')) {
      throw new Error('confirmationCode is not found in loginSession');
    }

    if (typeof loginSessionPayload.confirmationCode !== 'string') {
      throw new Error('confirmationCode is not a string');
    }

    yield put(
      AccountActions.SIGN_IN_EMAIL_CODE.SET_TEMP_EMAIL.create({
        email,
        code: loginSessionPayload.confirmationCode,
      }),
    );

    while (true) {
      const {reset} = yield race({
        reset: take(AccountActions.SIGN_IN_EMAIL_CODE.RESET.type),
        delay: delay(EMAIL_CODE_GET_STATUS_INTERVAL_SEC * 1000),
      });

      if (reset) {
        return;
      }

      const status: SagaReturnType<typeof getConfirmationStatus> = yield call(
        getConfirmationStatus,
        {loginSession},
      );

      if (
        status.confirmed &&
        checkProp(status, 'accessToken') &&
        checkProp(status, 'refreshToken')
      ) {
        yield call(persistToken, {
          accessToken: status.accessToken,
          refreshToken: status.refreshToken,
          issuer: 'custom',
        } as const);

        yield put(AccountActions.SIGN_IN_EMAIL_CODE.SUCCESS.create());
        yield put(AccountActions.USER_STATE_CHANGE.START.create());
        return;
      }
    }
  } catch (error) {
    let localizedError = null;
    if (
      (isValidationError(error) &&
        error.code === ValidationErrorCode.InvalidEmail) ||
      isApiError(error, 400, 'INVALID_EMAIL')
    ) {
      localizedError = t('errors.invalid_email');
    }

    if (isApiError(error, 403, 'TOO_MANY_REQUESTS')) {
      localizedError = t('errors.too_many_requests');
    }

    yield put(
      AccountActions.SIGN_IN_EMAIL_CODE.FAILED.create(
        localizedError ?? getErrorMessage(error),
      ),
    );

    if (!localizedError) {
      throw error;
    }
  }
}
