// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chat/actions';
import {getHasMoreChatDataSelector} from '@store/modules/Chat/selectors';
import {MessageData, MessageStatusType} from '@store/modules/Chat/types';
import {normalizeSearchValue} from '@utils/string';
import {put, SagaReturnType, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof ChatActions.LOAD_CHAT_DATA.START.create>;

const messageStatuses: MessageStatusType[] = ['sent', 'received', 'seen'];
function getMockedRandomData() {
  const iconRandom = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  const timeRandom = Math.floor(Math.random() * (14400 - 1 + 1)) + 1;
  const statusRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  return {
    icon: `https://ice-staging.b-cdn.net/profile/default-profile-picture-${iconRandom}.png`,
    minutesAgo: timeRandom,
    lastMessageStatus: messageStatuses[statusRandom - 1],
  };
}

const mockData: MessageData[] = [
  {
    id: 1,
    sourceName: 'Crypto Channel Bitcoin',
    lastMessage: 'Today is official premiere of new coin.',
    sourceType: 'channel',
    unreadMessages: 18,
    ...getMockedRandomData(),
  },
  {
    id: 2,
    sourceName: 'Dream team',
    lastMessage: 'Hi, Alex! How is it going?',
    sourceType: 'group',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    id: 3,
    sourceName: '@elizavetacryptostar',
    lastMessage: 'Hi, Max! Where are you from?',
    sourceType: 'private',
    isVerified: true,
    unreadMessages: 4,
    ...getMockedRandomData(),
  },
  {
    id: 4,
    sourceName: 'Ice Official Channel',
    lastMessage: 'Today is official premiere of new coin.',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    id: 5,
    sourceName: '@vadzinostrovskiy',
    lastMessage: 'Hi, Dima! How are you?',
    sourceType: 'private',
    isVerified: true,
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    id: 6,
    sourceName: 'God of Crypto',
    lastMessage: 'Today is official premiere of new coin. ',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    id: 7,
    sourceName: '@milananestrovskaya',
    lastMessage: 'Hi, cryprospecialyst! ',
    sourceType: 'private',
    isVerified: true,
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    id: 8,
    sourceName: 'My best friends',
    lastMessage:
      'Hi, I have a lot of ice, what should I do. I have a lot of ice, what should I do',
    sourceType: 'group',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    id: 9,
    sourceName: '@alexandramoisevich',
    lastMessage:
      'Hi, Alex! How is it going? Where are you. Hi, Alex! How is it going? Where are you',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    id: 10,
    sourceName: '@cryptoagnelworld',
    lastMessage: 'Hi, Sasha! How is it going? Hi, Sasha! How is it going?',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
];

export function* loadMessagesSaga(action: Actions) {
  const {initial, dataType, searchValue} = action.payload;
  const hasMoreMessages: SagaReturnType<
    ReturnType<typeof getHasMoreChatDataSelector>
  > = yield select(getHasMoreChatDataSelector(dataType));
  if (!initial && !hasMoreMessages) {
    yield put(
      ChatActions.LOAD_CHAT_DATA.SUCCESS.create({
        hasMore: false,
        dataType,
      }),
    );
    return null;
  }

  const normalizedSearchValue = normalizeSearchValue(searchValue);

  try {
    yield put(
      ChatActions.LOAD_CHAT_DATA.SUCCESS.create({
        chatData: !normalizedSearchValue
          ? mockData
          : mockData.filter(message =>
              message.sourceName.toLowerCase().includes(normalizedSearchValue),
            ),
        hasMore: false,
        dataType,
      }),
    );
  } catch {
    yield put(ChatActions.LOAD_CHAT_DATA.FAILED.create({dataType}));
  }
}
