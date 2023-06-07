// SPDX-License-Identifier: ice License 1.0

import {
  ChatData,
  ChatDataType,
  ChatUserData,
  ExploreData,
  ExploreDataType,
} from '@store/modules/Chats/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_EXPLORE_DATA_TYPE = createAction('SET_EXPLORE_DATA_TYPE', {
  STATE: (payload: {exploreDataType: ExploreDataType | null}) => payload,
});

const LOAD_CHAT_DATA = createAction('LOAD_CHAT_DATA', {
  START: (payload: {
    initial?: boolean;
    dataType: ChatDataType;
    searchValue: string;
  }) => payload,
  SUCCESS: (payload: {
    exploreData?: ExploreData[];
    userData?: ChatUserData[];
    chatData?: ChatData[];
    hasMore: boolean;
    dataType: ChatDataType;
  }) => payload,
  FAILED: (payload: {dataType: ChatDataType}) => payload,
});

export const ChatActions = Object.freeze({
  SET_EXPLORE_DATA_TYPE,
  LOAD_CHAT_DATA,
});
