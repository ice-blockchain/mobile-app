// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

export const getNewsIds = (state: RootState) =>
  rootSelector(state).sortedItemIds;
