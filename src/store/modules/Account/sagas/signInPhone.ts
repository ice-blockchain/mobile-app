// SPDX-License-Identifier: ice License 1.0

import {getValidUserForPhoneNumberMigration} from '@api/auth/getValidUserForPhoneNumberMigration';
import {isApiError} from '@api/client';
import {ValidationError, ValidationErrorCode} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {registrationUpdate} from '@store/modules/Account/utils/registrationUpdate';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* signInPhoneSaga(
  startAction: ReturnType<typeof AccountActions.SIGN_IN_PHONE.START.create>,
) {
  const {phoneNumber, isoCode} = startAction.payload;
  try {
    if (phoneNumber.trim() === '') {
      throw new ValidationError(ValidationErrorCode.InvalidPhone);
    }

    let cleanPhoneNumber = phoneNumber.replace('+', '');

    const user: SagaReturnType<typeof getValidUserForPhoneNumberMigration> =
      yield call(getValidUserForPhoneNumberMigration, {
        phoneNumber: cleanPhoneNumber,
      });

    if (user) {
      //TODO: handle existing user flow

      yield put(
        AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE_AND_ISO.create(
          phoneNumber,
          isoCode,
        ),
      );
    }

    console.log('getValidUserForPhoneNumberMigration:\n', user);
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      yield call(registrationUpdate);
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
