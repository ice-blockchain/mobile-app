// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import produce from 'immer';

export interface State {
  isAppLoaded: boolean;
}

type Actions = ReturnType<typeof AppCommonActions.APP_LOADED.STATE.create>;

const INITIAL_STATE: State = {
  isAppLoaded: false,
};

export function appCommonReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case AppCommonActions.APP_LOADED.STATE.type:
        draft.isAppLoaded = true;
        break;
    }
  });
}
