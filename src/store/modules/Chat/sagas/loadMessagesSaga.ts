// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chat/actions';
import {hasMoreMessagesSelector} from '@store/modules/Chat/selectors';
import {MessageData, MessageStatusType} from '@store/modules/Chat/types';
import {put, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof ChatActions.LOAD_MESSAGES_DATA.START.create>;

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
    sourceName: 'Crypto Channel Bitcoin',
    lastMessage: 'Today is official premiere of new coin.',
    sourceType: 'channel',
    unreadMessages: 18,
    ...getMockedRandomData(),
  },
  {
    sourceName: 'Dream team',
    lastMessage: 'Hi, Alex! How is it going?',
    sourceType: 'group',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    sourceName: '@elizavetacryptostar',
    lastMessage: 'Hi, Max! Where are you from?',
    sourceType: 'private',
    isVerified: true,
    unreadMessages: 4,
    ...getMockedRandomData(),
  },
  {
    sourceName: 'Ice Official Channel',
    lastMessage: 'Today is official premiere of new coin.',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    sourceName: '@vadzinostrovskiy',
    lastMessage: 'Hi, Dima! How are you?',
    sourceType: 'private',
    isVerified: true,
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    sourceName: 'God of Crypto',
    lastMessage: 'Today is official premiere of new coin. ',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    sourceName: '@milananestrovskaya',
    lastMessage: 'Hi, cryprospecialyst! ',
    sourceType: 'private',
    isVerified: true,
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    sourceName: 'My best friends',
    lastMessage:
      'Hi, I have a lot of ice, what should I do. I have a lot of ice, what should I do',
    sourceType: 'group',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    sourceName: '@alexandramoisevich',
    lastMessage:
      'Hi, Alex! How is it going? Where are you. Hi, Alex! How is it going? Where are you',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
  {
    sourceName: '@cryptoagnelworld',
    lastMessage: 'Hi, Sasha! How is it going? Hi, Sasha! How is it going?',
    sourceType: 'channel',
    unreadMessages: 1,
    ...getMockedRandomData(),
  },
];

export function* loadMessagesSaga(action: Actions) {
  const {initial} = action.payload;
  const hasMoreMessages: ReturnType<typeof hasMoreMessagesSelector> =
    yield select(hasMoreMessagesSelector);
  if (!initial && !hasMoreMessages) {
    yield put(
      ChatActions.LOAD_MESSAGES_DATA.SUCCESS.create({
        hasMore: false,
      }),
    );
    return null;
  }

  try {
    yield put(
      ChatActions.LOAD_MESSAGES_DATA.SUCCESS.create({
        messages: mockData,
        hasMore: false,
      }),
    );
  } catch {
    yield put(ChatActions.LOAD_MESSAGES_DATA.FAILED.create());
  }
}
