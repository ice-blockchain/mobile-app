// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chat/actions';
import {hasMoreChatUsersSelector} from '@store/modules/Chat/selectors';
import {put, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof ChatActions.LOAD_CHAT_USERS_DATA.START.create>;

function getMockedChatUser(username: string) {
  const iconRandom = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  const timeRandom = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
  return {
    username,
    icon: `https://ice-staging.b-cdn.net/profile/default-profile-picture-${iconRandom}.png`,
    lastSeenMinutesAgo: timeRandom,
  };
}

const mockUserNames = [
  'camillamax',
  'johnyknoxxx',
  'borisjhonson',
  'johnwick',
  'tonyhawk',
  'grantorino',
  'andrewmiller',
  'ziegler',
  'soulgoodman',
  'pamelaanderson',
  'neo',
  'leonardodicaprio',
];

export function* loadChatUsersSaga(action: Actions) {
  const {initial} = action.payload;
  const hasMoreChatUsers: ReturnType<typeof hasMoreChatUsersSelector> =
    yield select(hasMoreChatUsersSelector);
  if (!initial && !hasMoreChatUsers) {
    yield put(
      ChatActions.LOAD_CHAT_USERS_DATA.SUCCESS.create({
        hasMore: false,
      }),
    );
    return null;
  }

  try {
    yield put(
      ChatActions.LOAD_CHAT_USERS_DATA.SUCCESS.create({
        users: mockUserNames.map(getMockedChatUser),
        hasMore: false,
      }),
    );
  } catch {
    yield put(ChatActions.LOAD_CHAT_USERS_DATA.FAILED.create());
  }
}
