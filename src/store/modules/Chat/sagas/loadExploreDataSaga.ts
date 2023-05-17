// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chat/actions';
import {
  exploreDataTypeSelector,
  getHasMoreChatDataSelector,
} from '@store/modules/Chat/selectors';
import {ExploreData} from '@store/modules/Chat/types';
import {normalizeSearchValue} from '@utils/string';
import {put, SagaReturnType, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof ChatActions.LOAD_CHAT_DATA.START.create>;

function getMockedRandomData() {
  const iconRandom = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  return {
    icon: `https://ice-staging.b-cdn.net/profile/default-profile-picture-${iconRandom}.png`,
  };
}

const mockData: ExploreData[] = [
  {
    type: 'channel',
    displayName: 'ICE Official Channel',
    membersNumber: 44594,
    isVerified: true,
    ...getMockedRandomData(),
  },
  {
    type: 'group',
    displayName: 'Crypto Librarys Airdrop',
    membersNumber: 1544594,
    isSubscribed: true,
    ...getMockedRandomData(),
  },
  {
    type: 'group',
    displayName: 'ICE Coin crypto',
    membersNumber: 54844,
    ...getMockedRandomData(),
  },
  {
    type: 'channel',
    displayName: 'Crypto Channel Bitcoin',
    membersNumber: 144594,
    ...getMockedRandomData(),
  },
  {
    type: 'channel',
    displayName: 'Crypto Librarys Airdrop',
    membersNumber: 144594,
    ...getMockedRandomData(),
  },
  {
    type: 'group',
    displayName: 'Crypto world - Spain',
    membersNumber: 144594,
    ...getMockedRandomData(),
  },
  {
    type: 'group',
    displayName: 'Crypto - EUROPE',
    membersNumber: 144594,
    ...getMockedRandomData(),
  },
  {
    type: 'channel',
    displayName: 'Swiss on crypto',
    membersNumber: 144594,
    ...getMockedRandomData(),
  },
  {
    type: 'group',
    displayName: 'Berlin',
    membersNumber: 144594,
    ...getMockedRandomData(),
  },
  {
    type: 'group',
    displayName: 'Budapest',
    membersNumber: 84594,
    ...getMockedRandomData(),
  },
  {
    type: 'group',
    displayName: 'Bucharest',
    membersNumber: 15124,
    ...getMockedRandomData(),
  },
];

export function* loadExploreDataSaga(action: Actions) {
  const {initial, dataType, searchValue} = action.payload;
  const hasMoreChatUsers: SagaReturnType<
    ReturnType<typeof getHasMoreChatDataSelector>
  > = yield select(getHasMoreChatDataSelector(dataType));
  const exploreDataType: ReturnType<typeof exploreDataTypeSelector> =
    yield select(exploreDataTypeSelector);

  if (!initial && !hasMoreChatUsers) {
    yield put(
      ChatActions.LOAD_CHAT_DATA.SUCCESS.create({
        hasMore: false,
        dataType,
      }),
    );
    return null;
  }

  const exploreData = exploreDataType
    ? mockData.filter(data => data.type === exploreDataType)
    : mockData;

  const normalizedSearchValue = normalizeSearchValue(searchValue);

  try {
    yield put(
      ChatActions.LOAD_CHAT_DATA.SUCCESS.create({
        exploreData: !normalizedSearchValue
          ? exploreData
          : exploreData.filter(value =>
              value.displayName.toLowerCase().includes(normalizedSearchValue),
            ),
        hasMore: false,
        dataType,
      }),
    );
  } catch {
    yield put(ChatActions.LOAD_CHAT_DATA.FAILED.create({dataType}));
  }
}
