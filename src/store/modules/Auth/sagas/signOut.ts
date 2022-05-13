// SPDX-License-Identifier: BUSL-1.1

import {magicLink} from '@services/magicLink';
import {put} from 'redux-saga/effects';

import AuthActions from '../actions';

export default function* usernameValidationSaga() {
  try {
    yield magicLink.logoutUser();
    yield put(AuthActions.SIGN_OUT.SUCCESS.create());
  } catch (error) {
    yield put(AuthActions.SIGN_OUT.FAILED.create());
  }
}
