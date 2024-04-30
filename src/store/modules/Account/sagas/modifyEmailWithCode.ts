// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {EMAIL_CODE_GET_STATUS_INTERVAL_SEC} from '@constants/timeouts';
import {getConfirmationStatus} from '@services/auth';
import {
  isValidationError,
  ValidationError,
  ValidationErrorCode,
} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
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

const actionCreator = AccountActions.MODIFY_EMAIL_WITH_CODE.START.create;

export function* modifyEmailWithCodeSaga({
  payload: {email},
}: ReturnType<typeof actionCreator>) {
  const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
    unsafeUserSelector,
  );
  try {
    if (!validateEmail(email)) {
      throw new ValidationError(ValidationErrorCode.InvalidEmail);
    } else if (email.toLowerCase() === user.email?.toLowerCase()) {
      throw new ValidationError(ValidationErrorCode.SameEmail);
    }

    yield call(
      updateAccountSaga,
      AccountActions.UPDATE_ACCOUNT.START.create({email}),
    );

    const {loginSession}: SagaReturnType<typeof unsafeUserSelector> =
      yield select(unsafeUserSelector);

    if (!loginSession) {
      throw new Error('User.loginSession is not defined');
    }

    const loginSessionPayload = jwt_decode(loginSession);

    if (!checkProp(loginSessionPayload, 'confirmationCode')) {
      throw new Error('confirmationCode is not found in loginSession');
    }

    if (typeof loginSessionPayload.confirmationCode !== 'string') {
      throw new Error('confirmationCode is not a string');
    }

    yield put(
      AccountActions.MODIFY_EMAIL_WITH_CODE.SET_TEMP_EMAIL.create({
        email,
        code: loginSessionPayload.confirmationCode,
      }),
    );

    while (true) {
      const {reset} = yield race({
        reset: take(AccountActions.MODIFY_EMAIL_WITH_CODE.RESET.type),
        delay: delay(EMAIL_CODE_GET_STATUS_INTERVAL_SEC * 1000),
      });

      if (reset) {
        return;
      }

      const status: SagaReturnType<typeof getConfirmationStatus> = yield call(
        getConfirmationStatus,
        {loginSession},
      );

      if (status.confirmed) {
        yield put(AccountActions.MODIFY_EMAIL_WITH_CODE.SUCCESS.create());
        yield put(AccountActions.SIGN_OUT.START.create());
        return;
      }
    }
  } catch (error) {
    let localizedError;

    if (isValidationError(error)) {
      localizedError = error.message;
    }

    if (
      isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER') &&
      error?.response?.data?.data?.field === 'email'
    ) {
      localizedError = t('errors.email_already_taken');
    }

    yield put(
      AccountActions.MODIFY_EMAIL_WITH_CODE.FAILED.create(
        localizedError ?? getErrorMessage(error),
      ),
    );

    if (!localizedError) {
      throw error;
    }
  }
}
