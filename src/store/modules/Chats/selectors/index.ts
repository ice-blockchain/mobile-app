// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chats/actions';
import {ChatDataType} from '@store/modules/Chats/types';
import {processStatusForActionSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';

export const chatListDataSelector = (state: RootState) => state.chats.chatData;
export const chatUsersDataSelector = (state: RootState) =>
  state.chats.chatUsers;
export const exploreDataSelector = (state: RootState) =>
  state.chats.exploreData;

export const getLoadingChatDataSelector =
  (dataType: ChatDataType) => (state: RootState) => {
    const requestData = processStatusForActionSelector<{
      initial?: boolean;
      dataType: ChatDataType;
      searchValue: string;
    }>(state, ChatActions.LOAD_CHAT_DATA);

    return !!(
      requestData &&
      requestData.status === 'START' &&
      requestData.payload?.dataType === dataType
    );
  };
export const getHasMoreChatDataSelector =
  (dataType: ChatDataType) => (state: RootState) =>
    !!state.chats.hasMore[dataType];

export const getSearchVisibleSelector =
  (dataType: ChatDataType) => (state: RootState) =>
    !!state.chats.searchVisible[dataType];

export const exploreDataTypeSelector = (state: RootState) =>
  state.chats.exploreDatatype;
