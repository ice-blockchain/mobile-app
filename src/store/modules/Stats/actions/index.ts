// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const GET_ICE_COIN_STATS = createAction('GET_ICE_COIN_STATS', {
  START: true,
  SUCCESS: (payload: {config: unknown}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const StatsActions = Object.freeze({
  GET_ICE_COIN_STATS,
});
