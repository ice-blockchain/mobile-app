// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const isAppLoadedSelector = (state: RootState) =>
  state.appCommon.isAppLoaded;

export const isAppInitializedSelector = (state: RootState) =>
  state.appCommon.isAppInitialized;

export const isAppActiveSelector = (state: RootState) =>
  state.appCommon.appState === 'active';
