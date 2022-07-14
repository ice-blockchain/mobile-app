// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {createUserSaga} from './createUser';
import {deleteAccountSaga} from './deleteAccount';
import {fetchUserProfileSaga} from './fetchUserProfile';
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
    takeLatest(AuthActions.CREATE_USER.START.type, createUserSaga),
    takeLatest(AuthActions.DELETE_ACCOUNT.START.type, deleteAccountSaga),
    takeLatest(
      ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.type,
      createUserSaga,
    ),
    takeLatest(AuthActions.FETCH_USER_PROFILE.START.type, fetchUserProfileSaga),
  ]);
}
