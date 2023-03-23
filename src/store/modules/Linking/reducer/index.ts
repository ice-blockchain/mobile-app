// SPDX-License-Identifier: ice License 1.0

import {LinkingActions} from '@store/modules/Linking/actions';
import produce from 'immer';

export interface State {
  handledUrl: string;
}

type Actions = ReturnType<typeof LinkingActions.HANDLE_URL.STATE.create>;

const INITIAL_STATE: State = {
  handledUrl: '',
};

export function linkingReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case LinkingActions.HANDLE_URL.STATE.type:
        draft.handledUrl = action.payload.url;
        break;
    }
  });
}
