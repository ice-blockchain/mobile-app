// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import {ValidationActions} from '../actions';
import {phoneValidationSaga} from './phoneValidationSaga';
import {usernameValidationSaga} from './usernameValidationSaga';

export function* rootValidationSaga() {
  yield all([
    takeLatest(
      ValidationActions.PHONE_VALIDATION.START.type,
      phoneValidationSaga,
    ),
    takeLatest(
      ValidationActions.USERNAME_VALIDATION.START.type,
      usernameValidationSaga,
    ),
  ]);
}
