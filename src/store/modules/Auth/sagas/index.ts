// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import {AuthActions} from '../actions';
import {signOutSaga} from './signOut';

export function* rootAuthSaga() {
  yield all([takeLatest(AuthActions.SIGN_OUT.START.type, signOutSaga)]);
}
