// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {
  userIdSelector,
  userPhoneNumberSelector,
} from '@store/modules/Auth/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.PHONE_VALIDATION.START.create;

export function* phoneValidationSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {validationCode} = action.payload;
    const phoneNumber: string = yield select(userPhoneNumberSelector);
    const phoneNumberHash: string = yield call(hashPhoneNumber, phoneNumber);
    const userId: string = yield select(userIdSelector);

    const user: SagaReturnType<typeof Api.validations.phoneValidation> =
      yield call(Api.validations.phoneValidation, {
        userId,
        phoneNumber,
        phoneNumberHash,
        validationCode,
      });
    yield put(ValidationActions.PHONE_VALIDATION.SUCCESS.create(user));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(ValidationActions.PHONE_VALIDATION.FAILED.create(errorMessage));
  }
}
