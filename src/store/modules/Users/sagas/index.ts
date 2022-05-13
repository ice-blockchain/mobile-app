// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import usernameValidationSaga from './usernameValidationSaga';
import UsersActions from '../actions';

export default function* rootSaga() {
  console.log('asdasdasdasdas');
  yield all([
    takeLatest(
      UsersActions.USERNAME_VALIDATION.START.type,
      usernameValidationSaga,
    ),
  ]);
}
