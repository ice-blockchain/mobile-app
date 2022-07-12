// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ValidationActions} from '@store/modules/Validation/actions';
import {put} from 'redux-saga/effects';

const actionCreator = ValidationActions.REF_USERNAME_VALIDATION.START.create;

export function* validateUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {refUsername} = action.payload;
    yield Api.validations.validateUsername({username: refUsername});
    yield put(
      ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create(refUsername),
    );
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(
      ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(errorMessage),
    );
  }
}
