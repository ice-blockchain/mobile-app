// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {ActiveTabActions, ChatTab, Tab} from '@store/modules/ActiveTab/actions';
import produce from 'immer';

export interface State {
  activeTab: Tab;
  activeChatTab: ChatTab;
}

type Actions =
  | ReturnType<typeof ActiveTabActions.SET_ACTIVE_TAB.STATE.create>
  | ReturnType<typeof ActiveTabActions.SET_ACTIVE_CHAT_TAB.STATE.create>
  | ReturnType<typeof AccountActions.SIGN_OUT.SUCCESS.create>;

const INITIAL_STATE: State = {
  activeTab: 'home',
  activeChatTab: 'chatlist',
};

export function activeTab(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ActiveTabActions.SET_ACTIVE_TAB.STATE.type:
        draft.activeTab = action.payload.tab;
        break;
      case ActiveTabActions.SET_ACTIVE_CHAT_TAB.STATE.type:
        draft.activeChatTab = action.payload.tab;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}
