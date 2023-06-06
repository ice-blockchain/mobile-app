// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chats/actions';
import {loadChatDataSaga} from '@store/modules/Chats/sagas/loadChatDataSaga';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootChatSaga() {
  yield all([
    takeLatest([ChatActions.LOAD_CHAT_DATA.START.type], loadChatDataSaga),
  ]);
}
