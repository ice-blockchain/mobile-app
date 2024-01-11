// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {deleteAccountSaga} from '@store/modules/Account/sagas/deleteAccount';
import {getAccountSaga} from '@store/modules/Account/sagas/getAccount';
import {getAuthConfigSaga} from '@store/modules/Account/sagas/getAuthConfig';
import {getInstallReferrerSaga} from '@store/modules/Account/sagas/getInstallReferrer';
import {migrateEmailWithCodeSaga} from '@store/modules/Account/sagas/migrateEmailWithCode';
import {migratePhoneNumberSaga} from '@store/modules/Account/sagas/migratePhoneNumber';
import {modifyEmailWithCodeSaga} from '@store/modules/Account/sagas/modifyEmailWithCode';
import {modifyEmailWithLinkSaga} from '@store/modules/Account/sagas/modifyEmailWithLink';
import {signInEmailCodeSaga} from '@store/modules/Account/sagas/signInEmailCode';
import {signInEmailLinkSaga} from '@store/modules/Account/sagas/signInEmailLink';
import {signInPhoneSaga} from '@store/modules/Account/sagas/signInPhone';
import {signInSocialSaga} from '@store/modules/Account/sagas/signInSocial';
import {signOutSaga} from '@store/modules/Account/sagas/signOut';
import {subscribeUserChangedSaga} from '@store/modules/Account/sagas/subscribeUserChanged';
import {successfullyLinkedSaga} from '@store/modules/Account/sagas/successfullyLinked';
import {syncLanguageCodeSaga} from '@store/modules/Account/sagas/syncLanguageCode';
import {syncRtlSaga} from '@store/modules/Account/sagas/syncRTL';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {updateRefByUsernameSaga} from '@store/modules/Account/sagas/updateRefByUsernameSaga';
import {userStateChangeSaga} from '@store/modules/Account/sagas/userStateChange';
import {verifyPhoneNumberSaga} from '@store/modules/Account/sagas/verifyPhoneNumber';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {fork, takeLatest, takeLeading} from 'redux-saga/effects';

export const authWatchers = [
  takeLeading(
    AccountActions.SIGN_IN_EMAIL_LINK.START.type,
    signInEmailLinkSaga,
  ),
  takeLeading(
    AccountActions.SIGN_IN_EMAIL_CODE.START.type,
    signInEmailCodeSaga,
  ),
  takeLeading(
    AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.START.type,
    migratePhoneNumberSaga,
  ),
  takeLeading(AccountActions.SIGN_IN_PHONE.START.type, signInPhoneSaga),
  takeLeading(AccountActions.SIGN_IN_SOCIAL.START.type, signInSocialSaga),
  takeLeading(AccountActions.SIGN_OUT.START.type, signOutSaga),
  takeLatest(AccountActions.DELETE_ACCOUNT.START.type, deleteAccountSaga),
  takeLatest(AccountActions.USER_STATE_CHANGE.START.type, userStateChangeSaga),
  takeLatest(AccountActions.UPDATE_ACCOUNT.START.type, updateAccountSaga),
  takeLatest(
    AccountActions.UPDATE_REF_BY_USERNAME.START.type,
    updateRefByUsernameSaga,
  ),
  takeLatest(
    [
      AccountActions.GET_ACCOUNT.START.type,
      AppCommonActions.INTERVAL_UPDATE.STATE.type,
    ],
    getAccountSaga,
  ),
  takeLatest(
    AccountActions.MODIFY_EMAIL_WITH_LINK.START.type,
    modifyEmailWithLinkSaga,
  ),
  takeLatest(
    AccountActions.MODIFY_EMAIL_WITH_CODE.START.type,
    modifyEmailWithCodeSaga,
  ),
  takeLatest(
    AccountActions.VERIFY_PHONE_NUMBER.START.type,
    verifyPhoneNumberSaga,
  ),
  takeLatest(
    AccountActions.MIGRATE_EMAIL_WITH_CODE.START.type,
    migrateEmailWithCodeSaga,
  ),
  takeLatest(
    AccountActions.MIGRATE_EMAIL_WITH_CODE.SUCCESS.type,
    successfullyLinkedSaga,
  ),
  takeLatest(
    [
      AccountActions.UPDATE_ACCOUNT.SUCCESS.type,
      AccountActions.GET_ACCOUNT.SUCCESS.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
    ],
    syncRtlSaga,
  ),
  fork(syncLanguageCodeSaga),
  fork(subscribeUserChangedSaga),
  takeLatest(
    [
      AppCommonActions.APP_LOADED.STATE.type,
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
    ],
    getAuthConfigSaga,
  ),
  takeLatest(
    AppCommonActions.APP_INITIALIZED.SUCCESS.type,
    getInstallReferrerSaga,
  ),
];
