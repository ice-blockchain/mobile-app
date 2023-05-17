// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chat/actions';
import {getHasMoreChatDataSelector} from '@store/modules/Chat/selectors';
import {normalizeSearchValue} from '@utils/string';
import {put, SagaReturnType, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof ChatActions.LOAD_CHAT_DATA.START.create>;

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
  const {initial, dataType, searchValue} = action.payload;
  const hasMoreChatUsers: SagaReturnType<
    ReturnType<typeof getHasMoreChatDataSelector>
  > = yield select(getHasMoreChatDataSelector(dataType));
  if (!initial && !hasMoreChatUsers) {
    yield put(
      ChatActions.LOAD_CHAT_DATA.SUCCESS.create({
        hasMore: false,
        dataType,
      }),
    );
    return null;
  }

  const userData = mockUserNames.map(getMockedChatUser);

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
