// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppCommonActions, AppStateType} from '@store/modules/AppCommon/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  isAppLoaded: boolean;
  appInitState: 'loading' | 'success' | 'error';
  appState: AppStateType | null;
  isSplashHidden: boolean;

  // Needed to track if creative library screen was shown.
  // We supposed to show it for every app installation on a second open or foreground
  // if passed at least 1h since the first app open and sign-in.
  // Supposed to show it only once for each installation.
  firstSignInTime: number;
  showedCreativeLibrary: boolean;
}

type Actions = ReturnType<
  | typeof AppCommonActions.APP_LOADED.STATE.create
  | typeof AppCommonActions.APP_INITIALIZED.SUCCESS.create
  | typeof AppCommonActions.APP_INITIALIZED.FAILED.create
  | typeof AppCommonActions.APP_STATE_CHANGE.STATE.create
  | typeof AppCommonActions.SET_FIRST_SIGN_IN_TIME.STATE.create
  | typeof AppCommonActions.SET_SHOWED_CREATIVE_LIBRARY.STATE.create
  | typeof AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.create
>;

const INITIAL_STATE: State = {
  isAppLoaded: false,
  appInitState: 'loading',
  appState: 'active',
  isSplashHidden: false,
  firstSignInTime: 0,
  showedCreativeLibrary: false,
};

export function reducer(state = INITIAL_STATE, action: Actions): State {
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
      case AppCommonActions.SET_FIRST_SIGN_IN_TIME.STATE.type:
        draft.firstSignInTime = Date.now();
        break;
      case AppCommonActions.SET_SHOWED_CREATIVE_LIBRARY.STATE.type:
        draft.showedCreativeLibrary = true;
        break;
      case AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.type:
        draft.isSplashHidden = true;
        break;
    }
  });
}

export const appCommonReducer = persistReducer(
  {
    key: 'appCommon',
    storage: AsyncStorage,
    whitelist: ['firstSignInTime', 'showedCreativeLibrary'],
  },
  reducer,
);
