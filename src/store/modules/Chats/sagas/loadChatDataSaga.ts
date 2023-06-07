// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chats/actions';
import {loadChatUsersSaga} from '@store/modules/Chats/sagas/loadChatUsersSaga';
import {loadExploreDataSaga} from '@store/modules/Chats/sagas/loadExploreDataSaga';
import {loadMessagesSaga} from '@store/modules/Chats/sagas/loadMessagesSaga';
import {call} from 'redux-saga/effects';

type Actions = ReturnType<typeof ChatActions.LOAD_CHAT_DATA.START.create>;

export function* loadChatDataSaga(action: Actions) {
  const {dataType} = action.payload;
  switch (dataType) {
    case 'chats':
      yield call(loadMessagesSaga, action);
      break;
    case 'users':
      yield call(loadChatUsersSaga, action);
      break;
    case 'explore':
      yield call(loadExploreDataSaga, action);
      break;
  }
}
