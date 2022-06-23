// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {createSelector} from 'reselect';

const appCommonRootSelector = (state: RootState) => state.appCommon;

export const isAppLoadedSelector = createSelector(
  appCommonRootSelector,
  common => common.isAppLoaded,
);
