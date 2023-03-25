// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {inviteContactSaga} from './inviteContactSaga';
import {syncContactsSaga} from './syncContactsSaga';

export function* rootTeamSaga() {
  yield all([
    takeLatest(AppCommonActions.APP_LOADED.STATE.type, syncContactsSaga),
    takeLatest(ContactsActions.INVITE_CONTACT.START.type, inviteContactSaga),
  ]);
}
