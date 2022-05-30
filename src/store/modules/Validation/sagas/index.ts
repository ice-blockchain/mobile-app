// SPDX-License-Identifier: BUSL-1.1

import {ValidationActions} from '@store/modules/Validation/actions';
import {all, takeLatest} from 'redux-saga/effects';

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
