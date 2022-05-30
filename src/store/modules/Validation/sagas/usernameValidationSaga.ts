// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {put} from 'redux-saga/effects';

const actionCreator = ValidationActions.USERNAME_VALIDATION.START.create;

export function* usernameValidationSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {username} = action.payload;
    yield Api.validations.usernameValidation({username});
    yield put(ValidationActions.USERNAME_VALIDATION.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(
      ValidationActions.USERNAME_VALIDATION.FAILED.create(errorMessage),
    );
  }
}
