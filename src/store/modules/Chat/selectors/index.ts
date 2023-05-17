// SPDX-License-Identifier: ice License 1.0

import {ChatDataType} from '@store/modules/Chat/types';
import {RootState} from '@store/rootReducer';

export const messagesDataSelector = (state: RootState) => state.chat.messages;
export const chatUsersDataSelector = (state: RootState) => state.chat.chatUsers;
export const exploreDataSelector = (state: RootState) => state.chat.exploreData;

export const getLoadingChatDataSelector =
  (dataType: ChatDataType) => (state: RootState) =>
    !!state.chat.isLoading[dataType];
export const getHasMoreChatDataSelector =
  (dataType: ChatDataType) => (state: RootState) =>
    !!state.chat.hasMore[dataType];

export const getSearchVisibleSelector =
  (dataType: ChatDataType) => (state: RootState) =>
    !!state.chat.searchVisible[dataType];

export const exploreDataTypeSelector = (state: RootState) =>
  state.chat.exploreDatatype;
