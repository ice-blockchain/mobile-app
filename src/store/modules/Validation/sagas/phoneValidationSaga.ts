// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {put} from 'redux-saga/effects';

const actionCreator = ValidationActions.PHONE_VALIDATION.START.create;

export function* phoneValidationSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {phoneNumber, validationCode} = action.payload;
    yield Api.validations.phoneValidation({
      phoneNumber,
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
