// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import usernameValidationSaga from './usernameValidationSaga';
import phoneValidationSaga from './phoneValidationSaga';
import ValidationActions from '../actions';

export default function* rootSaga() {
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
