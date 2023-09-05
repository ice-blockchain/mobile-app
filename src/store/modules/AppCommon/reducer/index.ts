// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions, AppStateType} from '@store/modules/AppCommon/actions';
import produce from 'immer';
export interface State {
  isAppLoaded: boolean;
  appInitState: 'loading' | 'success' | 'error';
  appState: AppStateType | null;
  isSplashHidden: boolean;
}

type Actions = ReturnType<
  | typeof AppCommonActions.APP_LOADED.STATE.create
  | typeof AppCommonActions.APP_INITIALIZED.SUCCESS.create
  | typeof AppCommonActions.APP_INITIALIZED.FAILED.create
  | typeof AppCommonActions.APP_STATE_CHANGE.STATE.create
  | typeof AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.create
>;

const INITIAL_STATE: State = {
  isAppLoaded: false,
  appInitState: 'loading',
  appState: 'active',
  isSplashHidden: false,
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
      case AppCommonActions.APP_INITIALIZED.SUCCESS.type:
        draft.appInitState = 'success';
        break;
      case AppCommonActions.APP_INITIALIZED.FAILED.type:
        draft.appInitState = 'error';
        break;
      case AppCommonActions.APP_STATE_CHANGE.STATE.type:
        draft.appState = action.payload.appState;
        break;
      case AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.type:
        draft.isSplashHidden = true;
        break;
    }
  });
}
