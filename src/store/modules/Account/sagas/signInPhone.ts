// SPDX-License-Identifier: ice License 1.0

import {getValidUserForPhoneNumberMigration} from '@api/auth/getValidUserForPhoneNumberMigration';
import {isApiError} from '@api/client';
import {ValidationError, ValidationErrorCode} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {accountError} from '@store/modules/Account/utils/accountError';
import {linkYourEmail} from '@store/modules/Account/utils/linkYourEmail';
import {loginViaEmail} from '@store/modules/Account/utils/loginViaEmail';
import {registrationUpdate} from '@store/modules/Account/utils/registrationUpdate';
import {getErrorMessage} from '@utils/errors';
import {cleanNumberFromWhiteSpaces} from '@utils/phoneNumber';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* signInPhoneSaga(
  startAction: ReturnType<typeof AccountActions.SIGN_IN_PHONE.START.create>,
) {
  const {phoneNumber} = startAction.payload;
  try {
    if (phoneNumber.trim() === '') {
      throw new ValidationError(ValidationErrorCode.InvalidPhone);
    }

    const cleanPhoneNumber = cleanNumberFromWhiteSpaces(phoneNumber);

    const result: SagaReturnType<typeof getValidUserForPhoneNumberMigration> =
      yield call(getValidUserForPhoneNumberMigration, {
        phoneNumber: cleanPhoneNumber,
      });

    if (result) {
      yield call(linkYourEmail);
      yield put(
        AccountActions.SIGN_IN_PHONE.SET_MIGRATION_DATA.create({
          userId: result.id,
          phoneNumber: cleanPhoneNumber,
        }),
      );
    }
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      yield call(registrationUpdate);
      yield put(AccountActions.SIGN_IN_PHONE.RESET.create());
    } else if (isApiError(error, 403, 'ACCOUNT_LOST')) {
      yield call(accountError);
      yield put(AccountActions.SIGN_IN_PHONE.RESET.create());
    } else if (isApiError(error, 409, 'EMAIL_ALREADY_SET')) {
      yield call(loginViaEmail);
      yield put(AccountActions.SIGN_IN_PHONE.RESET.create());
    } else {
      yield put(
        AccountActions.SIGN_IN_PHONE.FAILED.create(getErrorMessage(error)),
      );
    }
  }
}
