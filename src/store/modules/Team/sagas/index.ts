// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {TeamActions} from '@store/modules/Team/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {getContactsSaga} from './getContactsSaga';
import {inviteContactSaga} from './inviteContactSaga';
import {searchUsersSaga} from './searchUsersSaga';

export function* rootTeamSaga() {
  yield all([
    takeLatest(
      [
        TeamActions.GET_CONTACTS.START.type,
        AppCommonActions.APP_LOADED.STATE.type,
      ],
      getContactsSaga,
    ),
    takeLatest(TeamActions.INVITE_CONTACT.START.type, inviteContactSaga),
    takeLatest(TeamActions.SEARCH_USERS.START.type, searchUsersSaga),
  ]);
}
