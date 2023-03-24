// SPDX-License-Identifier: ice License 1.0

import {ActiveTabActions, Tab} from '@store/modules/ActiveTab/actions';
import produce from 'immer';

export interface State {
  activeTab: Tab;
}

type Actions = ReturnType<typeof ActiveTabActions.SET_ACTIVE_TAB.STATE.create>;

const INITIAL_STATE: State = {
  activeTab: 'home',
};

export function activeTab(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ActiveTabActions.SET_ACTIVE_TAB.STATE.type:
        draft.activeTab = action.payload.tab;
        break;
    }
  });
}
