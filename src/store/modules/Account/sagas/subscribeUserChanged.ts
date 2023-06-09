// SPDX-License-Identifier: ice License 1.0

import {onUserChanged} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {eventChannel} from 'redux-saga';
import {call, put, SagaReturnType, take} from 'redux-saga/effects';

export function* subscribeUserChangedSaga() {
  const channel: SagaReturnType<typeof eventChannel> = yield call(
    eventChannel,
    emitter => onUserChanged(() => emitter({})),
  );

  try {
    while (true) {
      yield take(channel);
      yield put(AccountActions.USER_STATE_CHANGE.START.create());
    }
  } finally {
    channel.close();
  }
}
