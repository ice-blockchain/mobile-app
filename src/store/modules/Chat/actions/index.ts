// SPDX-License-Identifier: ice License 1.0

import {
  ChatDataType,
  ChatUserData,
  ExploreData,
  ExploreDataType,
  MessageData,
} from '@store/modules/Chat/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_SEARCH_VISIBLE = createAction('SET_SEARCH_VISIBLE', {
  STATE: (payload: {visible: boolean; dataType: ChatDataType}) => payload,
});

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
    chatData?: MessageData[];
    hasMore: boolean;
    dataType: ChatDataType;
  }) => payload,
  FAILED: (payload: {dataType: ChatDataType}) => payload,
});

export const ChatActions = Object.freeze({
  SET_SEARCH_VISIBLE,
  SET_EXPLORE_DATA_TYPE,
  LOAD_CHAT_DATA,
});
