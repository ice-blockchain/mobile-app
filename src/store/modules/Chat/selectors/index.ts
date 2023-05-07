// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const messagesDataSelector = (state: RootState) => state.chat.messages;
export const messagesLoadingSelector = (state: RootState) =>
  state.chat.loadingMessages;
export const hasMoreMessagesSelector = (state: RootState) =>
  state.chat.hasMoreMessages;
export const messagesSearchVisibleSelector = (state: RootState) =>
  state.chat.messagesSearchVisible;

export const chatUsersDataSelector = (state: RootState) => state.chat.chatUsers;
export const chatUsersLoadingSelector = (state: RootState) =>
  state.chat.loadingChatUsers;
export const hasMoreChatUsersSelector = (state: RootState) =>
  state.chat.hasMoreChatUsers;
