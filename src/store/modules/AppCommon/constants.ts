// SPDX-License-Identifier: ice License 1.0

import {StatsActions} from '@store/modules/Stats/actions';

/**
 * Actions that should be fulfilled before we show the main app UI
 */
export const INITIALIZE_ACTIONS = [StatsActions.GET_ICE_COIN_STATS];
