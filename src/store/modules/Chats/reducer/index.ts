// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {ChatActions} from '@store/modules/Chats/actions';
import {
  ChatUserData,
  ExploreData,
  ExploreDataType,
  MessageData,
} from '@store/modules/Chats/types';
import produce from 'immer';

export interface State {
  messages: MessageData[];
  chatUsers: ChatUserData[];
  exploreData: ExploreData[];
  exploreDatatype: ExploreDataType | null;

  searchVisible: {[key: string]: boolean};
  searchValue: {[key: string]: string};
  hasMore: {[key: string]: boolean};
  isInitialLoad: {[key: string]: boolean};
}

type Actions = ReturnType<
  | typeof ChatActions.LOAD_CHAT_DATA.START.create
  | typeof ChatActions.LOAD_CHAT_DATA.SUCCESS.create
  | typeof ChatActions.LOAD_CHAT_DATA.FAILED.create
  | typeof ChatActions.SET_EXPLORE_DATA_TYPE.STATE.create
  | typeof ChatActions.SET_SEARCH_VISIBLE.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  searchVisible: {},
  searchValue: {},
  hasMore: {},
  isInitialLoad: {},

  messages: [],
  chatUsers: [],
  exploreData: [],
  exploreDatatype: null,
};

function combine<T>(a: T[], b: T[], override: boolean) {
  if (override) {
    return b;
  }
  return [...a, ...b];
}

export function chatReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ChatActions.LOAD_CHAT_DATA.START.type:
        if (action.payload.initial) {
          draft.isInitialLoad[action.payload.dataType] = true;
        }
        break;
      case ChatActions.LOAD_CHAT_DATA.SUCCESS.type:
        const isInitialLoad = draft.isInitialLoad[action.payload.dataType];
        switch (action.payload.dataType) {
          case 'chats': {
            if (action.payload.chatData) {
              draft.messages = combine(
                draft.messages,
                action.payload.chatData,
                isInitialLoad,
              );
            }
            break;
          }
          case 'users': {
            if (action.payload.userData) {
              draft.chatUsers = combine(
                draft.chatUsers,
                action.payload.userData,
                isInitialLoad,
              );
            }
            break;
          }
          case 'explore': {
            if (action.payload.exploreData) {
              draft.exploreData = combine(
                draft.exploreData,
                action.payload.exploreData,
                isInitialLoad,
              );
            }
            break;
          }
        }
        draft.isInitialLoad[action.payload.dataType] = false;
        draft.hasMore[action.payload.dataType] = action.payload.hasMore;
        break;
      case ChatActions.LOAD_CHAT_DATA.FAILED.type:
        draft.hasMore[action.payload.dataType] = false;
        draft.isInitialLoad[action.payload.dataType] = false;
        break;
      case ChatActions.SET_SEARCH_VISIBLE.STATE.type:
        draft.searchVisible[action.payload.dataType] = action.payload.visible;
        break;
      case ChatActions.SET_EXPLORE_DATA_TYPE.STATE.type:
        draft.exploreDatatype = action.payload.exploreDataType;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {
          ...INITIAL_STATE,
        };
    }
  });
}
