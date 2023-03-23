// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const activeTabSelector = (state: RootState) =>
  state.activeTab.activeTab;

export const currentScreenNameSelector = (state: RootState) =>
  state.activeTab.currentScreenName;
