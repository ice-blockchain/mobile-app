// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {inviteContactSaga} from './inviteContactSaga';
import {syncContactsSaga} from './syncContactsSaga';

export function* rootTeamSaga() {
  yield all([
    takeLatest(
      [
        ContactsActions.SYNC_CONTACTS.START.type,
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.APP_INITIALIZED.SUCCESS.type,
        AccountActions.SIGN_OUT.SUCCESS.type,
      ],
      syncContactsSaga,
    ),
    takeLatest(ContactsActions.INVITE_CONTACT.START.type, inviteContactSaga),
  ]);
}
