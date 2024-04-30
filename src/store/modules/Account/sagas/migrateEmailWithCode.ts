// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {EMAIL_CODE_GET_STATUS_INTERVAL_SEC} from '@constants/timeouts';
import {getConfirmationStatus, persistToken} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {migrationLoginSessionSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
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

export function* migrateEmailWithCodeSaga() {
  try {
    const loginSession: SagaReturnType<typeof migrationLoginSessionSelector> =
      yield select(migrationLoginSessionSelector);

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
      AccountActions.MIGRATE_EMAIL_WITH_CODE.SET_CODE.create(
        loginSessionPayload.confirmationCode,
      ),
    );

    while (true) {
      const {reset} = yield race({
        reset: take(AccountActions.MIGRATE_EMAIL_WITH_CODE.RESET.type),
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

        yield put(AccountActions.MIGRATE_EMAIL_WITH_CODE.SUCCESS.create());
        yield put(AccountActions.USER_STATE_CHANGE.START.create());
        return;
      }
    }
  } catch (error) {
    let localizedError;

    if (
      isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER') &&
      error?.response?.data?.data?.field === 'email'
    ) {
      localizedError = t('errors.email_already_taken');
    }

    yield put(
      AccountActions.MIGRATE_EMAIL_WITH_CODE.FAILED.create(
        localizedError ?? getErrorMessage(error),
      ),
    );

    if (!localizedError) {
      throw error;
    }
  }
}
