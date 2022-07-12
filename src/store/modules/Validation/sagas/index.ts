// SPDX-License-Identifier: BUSL-1.1

import {ValidationActions} from '@store/modules/Validation/actions';
import {validateRefUsernameSaga} from '@store/modules/Validation/sagas/validateRefUsernameSaga';
import {all, takeLatest} from 'redux-saga/effects';

import {phoneValidationSaga} from './phoneValidationSaga';
import {validateUsernameSaga} from './validateUsernameSaga';

export function* rootValidationSaga() {
  yield all([
    takeLatest(
      ValidationActions.PHONE_VALIDATION.START.type,
      phoneValidationSaga,
    ),
    takeLatest(
      ValidationActions.USERNAME_VALIDATION.START.type,
      validateUsernameSaga,
    ),
    takeLatest(
      ValidationActions.REF_USERNAME_VALIDATION.START.type,
      validateRefUsernameSaga,
    ),
  ]);
}
