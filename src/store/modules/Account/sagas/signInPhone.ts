// SPDX-License-Identifier: ice License 1.0

import {signInWithPhoneNumber} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put, SagaReturnType, take} from 'redux-saga/effects';

enum ValidateError {
  InvalidPhone,
}

export function* signInPhoneSaga(
  startAction: ReturnType<typeof AccountActions.SIGN_IN_PHONE.START.create>,
) {
  try {
    const {phoneNumber, isoCode} = startAction.payload;

    if (phoneNumber.trim() === '') {
      throw {code: ValidateError.InvalidPhone};
    }

    let confirmation: SagaReturnType<typeof signInWithPhoneNumber> = yield call(
      signInWithPhoneNumber,
      phoneNumber,
    );

    yield put(
      AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE_AND_ISO.create(
        phoneNumber,
        isoCode,
      ),
    );

    let finished = false;
    while (!finished) {
      const action: ReturnType<
        | typeof AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.create
        | typeof AccountActions.SIGN_IN_PHONE.RESEND.create
        | typeof AccountActions.SIGN_IN_PHONE.RESET.create
      > = yield take([
        AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type,
        AccountActions.SIGN_IN_PHONE.RESEND.type,
        AccountActions.SIGN_IN_PHONE.RESET.type,
      ]);

      switch (action.type) {
        case AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type: {
          try {
            yield call(
              [confirmation, confirmation.confirm],
              action.payload.code,
            );
            yield put(AccountActions.SIGN_IN_PHONE.SUCCESS.create());
            finished = true;
          } catch (error) {
            yield put(
              AccountActions.SIGN_IN_PHONE.FAILED.create(
                getErrorMessage(error),
              ),
            );
          }
          break;
        }
        case AccountActions.SIGN_IN_PHONE.RESEND.type: {
          confirmation = yield call(signInWithPhoneNumber, phoneNumber);
          yield put(AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.create());
          break;
        }
        case AccountActions.SIGN_IN_PHONE.RESET.type:
          finished = true;
          break;
      }
    }
  } catch (error) {
    if (checkProp(error, 'code') && error.code === ValidateError.InvalidPhone) {
      yield put(
        AccountActions.SIGN_IN_PHONE.FAILED.create(t('errors.invalid_phone')),
      );
    } else {
      yield put(
        AccountActions.SIGN_IN_PHONE.FAILED.create(getErrorMessage(error)),
      );
      throw error;
    }
  }
}
