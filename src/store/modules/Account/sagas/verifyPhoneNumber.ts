// SPDX-License-Identifier: ice License 1.0

import {verifyPhoneNumber} from '@services/auth';
import {
  isValidationError,
  ValidationError,
  ValidationErrorCode,
} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = AccountActions.VERIFY_PHONE_NUMBER.START.create;

export function* verifyPhoneNumberSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const user: ReturnType<typeof userSelector> = yield select(userSelector);

  const {phoneNumber} = action.payload;

  try {
    if (phoneNumber === user?.phoneNumber) {
      throw new ValidationError(ValidationErrorCode.SamePhoneNumber);
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

    if (isValidationError(error)) {
      validateError = error.message;
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
