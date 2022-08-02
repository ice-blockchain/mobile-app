// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import {TeamActions} from '@store/modules/Team/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {inviteContactSaga} from './inviteContactSaga';
import {searchUsersSaga} from './searchUsersSaga';
import {syncContactsSaga} from './syncContactsSaga';

export function* rootTeamSaga() {
  yield all([
    takeLatest(
      [
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.APP_INITIALIZED.STATE.type,
        AuthActions.SIGN_OUT.SUCCESS.type,
      ],
      syncContactsSaga,
    ),
    takeLatest(TeamActions.INVITE_CONTACT.START.type, inviteContactSaga),
    takeLatest(TeamActions.SEARCH_USERS.START.type, searchUsersSaga),
  ]);
}
