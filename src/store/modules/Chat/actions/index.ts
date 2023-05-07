// SPDX-License-Identifier: ice License 1.0

import {ChatUserData, MessageData} from '@store/modules/Chat/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_MESSAGES_SEARCH_VISIBLE = createAction(
  'SET_MESSAGES_SEARCH_VISIBLE',
  {
    STATE: (payload: {visible: boolean}) => payload,
  },
);

const LOAD_MESSAGES_DATA = createAction('LOAD_MESSAGES_DATA', {
  START: (initial?: boolean) => ({initial}),
  SUCCESS: (payload: {messages?: MessageData[]; hasMore: boolean}) => payload,
  FAILED: true,
});

const LOAD_CHAT_USERS_DATA = createAction('LOAD_CHAT_USERS_DATA', {
  START: (initial?: boolean) => ({initial}),
  SUCCESS: (payload: {users?: ChatUserData[]; hasMore: boolean}) => payload,
  FAILED: true,
});

export const ChatActions = Object.freeze({
  LOAD_MESSAGES_DATA,
  LOAD_CHAT_USERS_DATA,
  SET_MESSAGES_SEARCH_VISIBLE,
});
