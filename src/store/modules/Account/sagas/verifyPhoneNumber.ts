// SPDX-License-Identifier: ice License 1.0

import {verifyPhoneNumber} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = AccountActions.VERIFY_PHONE_NUMBER.START.create;

enum ValidateError {
  SamePhoneNumber,
}

export function* verifyPhoneNumberSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const user: ReturnType<typeof userSelector> = yield select(userSelector);

  const {phoneNumber} = action.payload;

  try {
    if (phoneNumber === user?.phoneNumber) {
      throw {code: ValidateError.SamePhoneNumber};
    }

    const verificationId: SagaReturnType<typeof verifyPhoneNumber> = yield call(
      verifyPhoneNumber,
      phoneNumber,
    );

    yield put(
      AccountActions.VERIFY_PHONE_NUMBER.SUCCESS.create(
        phoneNumber,
        verificationId,
      ),
    );
  } catch (error) {
    let validateError;

    if (
      checkProp(error, 'code') &&
      error.code === ValidateError.SamePhoneNumber
    ) {
      validateError = t('confirm_phone.same_phone_error');
    }

    yield put(
      AccountActions.VERIFY_PHONE_NUMBER.FAILED.create(
        validateError ?? getErrorMessage(error),
      ),
    );

    if (!validateError) {
      throw error;
    }
  }
}
