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
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* signInPhoneSaga(
  startAction: ReturnType<typeof AccountActions.SIGN_IN_PHONE.START.create>,
) {
  const {phoneNumber} = startAction.payload;
  try {
    if (phoneNumber.trim() === '') {
      throw new ValidationError(ValidationErrorCode.InvalidPhone);
    }

    let cleanPhoneNumber = phoneNumber.replace(/ /g, '');

    const result: SagaReturnType<typeof getValidUserForPhoneNumberMigration> =
      yield call(getValidUserForPhoneNumberMigration, {
        phoneNumber: cleanPhoneNumber,
      });

    if (result) {
      yield call(linkYourEmail);
      yield put(
        AccountActions.SIGN_IN_PHONE.SET_TEMP_USERID.create({
          userId: result.id,
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

  // yield put(
  //   AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE_AND_ISO.create(
  //     phoneNumber,
  //     isoCode,
  //   ),
  // );

  //   let finished = false;
  //   while (!finished) {
  //     const action: ReturnType<
  //       | typeof AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.create
  //       | typeof AccountActions.SIGN_IN_PHONE.RESEND.create
  //       | typeof AccountActions.SIGN_IN_PHONE.RESET.create
  //     > = yield take([
  //       AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type,
  //       AccountActions.SIGN_IN_PHONE.RESEND.type,
  //       AccountActions.SIGN_IN_PHONE.RESET.type,
  //     ]);

  //     switch (action.type) {
  //       case AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type: {
  //         try {
  //           yield call(
  //             [confirmation, confirmation.confirm],
  //             action.payload.code,
  //           );
  //           yield put(AccountActions.SIGN_IN_PHONE.SUCCESS.create());
  //           finished = true;
  //         } catch (error) {
  //           yield put(
  //             AccountActions.SIGN_IN_PHONE.FAILED.create(
  //               getErrorMessage(error),
  //             ),
  //           );
  //         }
  //         break;
  //       }
  //       case AccountActions.SIGN_IN_PHONE.RESEND.type: {
  //         confirmation = yield call(signInWithPhoneNumber, phoneNumber);
  //         yield put(AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.create());
  //         break;
  //       }
  //       case AccountActions.SIGN_IN_PHONE.RESET.type:
  //         finished = true;
  //         break;
  //     }
  //   }
  // } catch (error) {
  //   if (isValidationError(error)) {
  //     yield put(AccountActions.SIGN_IN_PHONE.FAILED.create(error.message));
  //   } else {
  //     yield put(
  //       AccountActions.SIGN_IN_PHONE.FAILED.create(getErrorMessage(error)),
  //     );
  //     throw error;
  //   }
  // }
}
