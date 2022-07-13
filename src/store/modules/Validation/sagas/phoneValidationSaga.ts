// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {sha256} from 'react-native-sha256';
import {call, put} from 'redux-saga/effects';

const actionCreator = ValidationActions.PHONE_VALIDATION.START.create;

export function* phoneValidationSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId, phoneNumber, validationCode} = action.payload;
    const phoneNumberHash: string = yield call(sha256, phoneNumber);
    yield Api.validations.phoneValidation({
      userId,
      phoneNumber,
      phoneNumberHash,
      validationCode,
    });
    yield put(ValidationActions.PHONE_VALIDATION.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(ValidationActions.PHONE_VALIDATION.FAILED.create(errorMessage));
  }
}
