// SPDX-License-Identifier: ice License 1.0

import {getValidUserForPhoneNumberMigration} from '@api/auth/getValidUserForPhoneNumberMigration';
import {isApiError} from '@api/client';
import {ValidationError, ValidationErrorCode} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {emailAlreadyInUse} from '@store/modules/Account/utils/emailAlreadyInUse';
import {loginViaEmail} from '@store/modules/Account/utils/loginViaEmail';
import {migrationPhoneNumberSelector} from '@store/modules/Validation/selectors';
import {validateEmail} from '@utils/email';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* migratePhoneNumberSaga(
  startAction: ReturnType<
    typeof AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.START.create
  >,
) {
  const phoneNumber: ReturnType<typeof migrationPhoneNumberSelector> =
    yield select(migrationPhoneNumberSelector);
  const {email} = startAction.payload;

  try {
    if (!validateEmail(email)) {
      throw new ValidationError(ValidationErrorCode.InvalidEmail);
    }
    const result: SagaReturnType<typeof getValidUserForPhoneNumberMigration> =
      yield call(getValidUserForPhoneNumberMigration, {
        phoneNumber: phoneNumber,
        email: email,
      });
    if (result) {
      yield put(AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.SUCCESS.create());
    }
  } catch (error) {
    if (isApiError(error, 409, 'EMAIL_ALREADY_SET')) {
      yield call(loginViaEmail);
      yield put(AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.RESET.create());
    } else if (isApiError(error, 409, 'EMAIL_USED_BY_SOMEBODY_ELSE')) {
      yield call(emailAlreadyInUse);
      yield put(AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.CLEAR.create());
    } else {
      yield put(
        AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.FAILED.create(
          getErrorMessage(error),
        ),
      );
    }
  }
}
