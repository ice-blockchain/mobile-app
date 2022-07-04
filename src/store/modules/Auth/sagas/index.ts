// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {loadUserSaga} from './loadUser';
import {signInEmailSaga} from './signInEmail';
import {signInPhoneSaga} from './signInPhone';
import {signInSocialSaga} from './signInSocial';
import {signOutSaga} from './signOut';

export function* rootAuthSaga() {
  yield all([
    takeLatest(AppCommonActions.APP_LOADED.STATE.type, loadUserSaga),
    takeLatest(AuthActions.SIGN_IN_EMAIL.START.type, signInEmailSaga),
    takeLatest(AuthActions.SIGN_IN_PHONE.START.type, signInPhoneSaga),
    takeLatest(AuthActions.SIGN_IN_SOCIAL.START.type, signInSocialSaga),
    takeLatest(AuthActions.SIGN_OUT.START.type, signOutSaga),
  ]);
}
