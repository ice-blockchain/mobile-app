// SPDX-License-Identifier: ice License 1.0

import {INITIALIZE_ACTIONS} from '@store/modules/AppCommon/constants';
import {
  isFailedSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';

export const isAppLoadedSelector = (state: RootState) =>
  state.appCommon.isAppLoaded;

export const appInitStateSelector = (state: RootState) =>
  state.appCommon.appInitState;

export const isAppInitializedSelector = (state: RootState) =>
  state.appCommon.appInitState === 'success';

export const isAppActiveSelector = (state: RootState) =>
  state.appCommon.appState === 'active';

export const failedInitializeActionSelector = (state: RootState) => {
  return INITIALIZE_ACTIONS.find(action => isFailedSelector(action, state));
};

export const initSuccessSelector = (state: RootState) => {
  return !INITIALIZE_ACTIONS.find(action => !isSuccessSelector(action, state));
};

export const isSplashHiddenSelector = (state: RootState) =>
  state.appCommon.isSplashHidden;
