// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {getContactsSaga} from './getContactsSaga';
import {inviteContactSaga} from './inviteContactSaga';

export function* rootTeamSaga() {
  yield all([
    takeLatest(TeamActions.GET_CONTACTS.START.type, getContactsSaga),
    takeLatest(TeamActions.INVITE_CONTACT.START.type, inviteContactSaga),
  ]);
}
