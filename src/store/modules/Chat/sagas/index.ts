// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chat/actions';
import {loadChatUsersSaga} from '@store/modules/Chat/sagas/loadChatUsersSaga';
import {loadMessagesSaga} from '@store/modules/Chat/sagas/loadMessagesSaga';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootChatSaga() {
  yield all([
    takeLatest([ChatActions.LOAD_MESSAGES_DATA.START.type], loadMessagesSaga),
    takeLatest(
      [ChatActions.LOAD_CHAT_USERS_DATA.START.type],
      loadChatUsersSaga,
    ),
  ]);
}
