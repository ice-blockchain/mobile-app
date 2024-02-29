// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const iceCoinStatsSelector = (state: RootState) => state.stats.iceCoin;
