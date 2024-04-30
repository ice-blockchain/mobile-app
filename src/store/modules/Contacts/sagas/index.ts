// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {BackgroundTasksActions} from '@store/modules/BackgroundTasks/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {getContactsSaga} from '@store/modules/Contacts/sagas/getContactsSaga';
import {inviteContactSaga} from '@store/modules/Contacts/sagas/inviteContactSaga';
import {syncContactsSaga} from '@store/modules/Contacts/sagas/syncContactsSaga';
import {takeLatest} from 'redux-saga/effects';

export const teamWatchers = [
  takeLatest(AppCommonActions.APP_INITIALIZED.SUCCESS.type, getContactsSaga),
  takeLatest(ContactsActions.INVITE_CONTACT.START.type, inviteContactSaga),
  takeLatest(
    BackgroundTasksActions.SYNC_CONTACTS_BACKGROUND_TASK.STATE.type,
    syncContactsSaga,
  ),
];
