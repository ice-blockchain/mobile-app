// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chats/actions';
import {normalizeSearchValue} from '@utils/string';
import {put} from 'redux-saga/effects';

type Actions = ReturnType<typeof ChatActions.LOAD_CHAT_DATA.START.create>;

function getMockedChatUser(username: string, id: number) {
  const iconRandom = Math.floor(Math.random() * 20) + 1;
  const timeRandom = Math.floor(Math.random() * 12) + 1;
  return {
    username,
    icon: `https://ice-staging.b-cdn.net/profile/default-profile-picture-${iconRandom}.png`,
    lastSeenMinutesAgo: timeRandom,
    id,
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
  const {dataType, searchValue} = action.payload;
  const userData = mockUserNames.map((value, index) =>
    getMockedChatUser(value, index),
  );

  const normalizedSearchValue = normalizeSearchValue(searchValue);

  try {
    yield put(
      ChatActions.LOAD_CHAT_DATA.SUCCESS.create({
        userData: !normalizedSearchValue
          ? userData
          : userData.filter(user =>
              user.username.toLowerCase().includes(normalizedSearchValue),
            ),
        hasMore: false,
        dataType,
      }),
    );
  } catch {
    yield put(ChatActions.LOAD_CHAT_DATA.FAILED.create({dataType}));
  }
}
