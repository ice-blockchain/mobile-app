// SPDX-License-Identifier: ice License 1.0

import {startTrackingCurrentUser} from '@services/analytics';
import {AccountActions} from '@store/modules/Account/actions';
import {call} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof AccountActions.USER_STATE_CHANGE.SUCCESS.create
>;

export function* startTrackingCurrentUserSaga(action: Actions) {
  const {user} = action.payload;
  if (user) {
    yield call(startTrackingCurrentUser, user.id);
  }
}
