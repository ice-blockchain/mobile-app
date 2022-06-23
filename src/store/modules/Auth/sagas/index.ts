// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {checkUserSaga} from './checkUser';
import {signOutSaga} from './signOut';

export function* rootAuthSaga() {
  yield all([
    takeLatest(AuthActions.SIGN_OUT.START.type, signOutSaga),
    takeLatest(AppCommonActions.APP_LOADED.STATE.type, checkUserSaga),
  ]);
}
