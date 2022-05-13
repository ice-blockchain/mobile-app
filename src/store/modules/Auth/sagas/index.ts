// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import signOutSaga from './signOut';
import AuthActions from '../actions';

export default function* rootSaga() {
  yield all([takeLatest(AuthActions.SIGN_OUT.START.type, signOutSaga)]);
}
