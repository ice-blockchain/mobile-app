// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {ChatActions} from '@store/modules/Chat/actions';
import {ChatUserData, MessageData} from '@store/modules/Chat/types';
import produce from 'immer';

export interface State {
  messages: MessageData[];
  hasMoreMessages: boolean;
  loadingMessages: boolean;
  messagesInitialLoad: boolean;
  messagesSearchVisible: boolean;

  chatUsers: ChatUserData[];
  hasMoreChatUsers: boolean;
  loadingChatUsers: boolean;
  chatUsersInitialLoad: boolean;
}

type Actions = ReturnType<
  | typeof ChatActions.LOAD_MESSAGES_DATA.START.create
  | typeof ChatActions.LOAD_MESSAGES_DATA.SUCCESS.create
  | typeof ChatActions.LOAD_MESSAGES_DATA.FAILED.create
  | typeof ChatActions.LOAD_CHAT_USERS_DATA.START.create
  | typeof ChatActions.LOAD_CHAT_USERS_DATA.SUCCESS.create
  | typeof ChatActions.LOAD_CHAT_USERS_DATA.FAILED.create
  | typeof ChatActions.SET_MESSAGES_SEARCH_VISIBLE.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  messages: [],
  hasMoreMessages: false,
  loadingMessages: false,
  messagesInitialLoad: false,
  messagesSearchVisible: false,
  chatUsers: [],
  hasMoreChatUsers: false,
  loadingChatUsers: false,
  chatUsersInitialLoad: false,
};

export function chatReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ChatActions.LOAD_MESSAGES_DATA.START.type:
        draft.loadingMessages = true;
        if (action.payload.initial) {
          draft.messagesInitialLoad = true;
        }
        break;
      case ChatActions.LOAD_CHAT_USERS_DATA.START.type:
        draft.loadingChatUsers = true;
        if (action.payload.initial) {
          draft.chatUsersInitialLoad = true;
        }
        break;
      case ChatActions.LOAD_MESSAGES_DATA.SUCCESS.type:
        draft.loadingMessages = false;
        if (action.payload.messages?.length) {
          if (draft.messagesInitialLoad) {
            draft.messages = action.payload.messages;
          } else {
            draft.messages = [...draft.messages, ...action.payload.messages];
          }
        }
        draft.messagesInitialLoad = false;
        draft.hasMoreMessages = action.payload.hasMore;
        break;
      case ChatActions.LOAD_CHAT_USERS_DATA.SUCCESS.type:
        draft.loadingChatUsers = false;
        if (action.payload.users?.length) {
          if (draft.chatUsersInitialLoad) {
            draft.chatUsers = action.payload.users;
          } else {
            draft.chatUsers = [...draft.chatUsers, ...action.payload.users];
          }
        }
        draft.chatUsersInitialLoad = false;
        draft.hasMoreChatUsers = action.payload.hasMore;
        break;
      case ChatActions.LOAD_MESSAGES_DATA.FAILED.type:
        draft.loadingMessages = false;
        draft.hasMoreMessages = false;
        draft.messagesInitialLoad = false;
        break;
      case ChatActions.LOAD_CHAT_USERS_DATA.FAILED.type:
        draft.loadingChatUsers = false;
        draft.hasMoreChatUsers = false;
        draft.chatUsersInitialLoad = false;
        break;
      case ChatActions.SET_MESSAGES_SEARCH_VISIBLE.STATE.type:
        draft.messagesSearchVisible = action.payload.visible;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {
          ...INITIAL_STATE,
        };
    }
  });
}
