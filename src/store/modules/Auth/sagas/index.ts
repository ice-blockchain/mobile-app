// SPDX-License-Identifier: BUSL-1.1

import {AuthActions} from '@store/modules/Auth/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {signOutSaga} from './signOut';

export function* rootAuthSaga() {
  yield all([takeLatest(AuthActions.SIGN_OUT.START.type, signOutSaga)]);
}
