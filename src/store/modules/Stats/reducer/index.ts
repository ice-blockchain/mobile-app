// SPDX-License-Identifier: ice License 1.0

import {StatsActions} from '@store/modules/Stats/actions';
import produce from 'immer';

export interface StatsState {
  iceCoin: unknown | null;
}

type Actions = ReturnType<
  typeof StatsActions.GET_ICE_COIN_STATS.SUCCESS.create
>;

const INITIAL_STATE: StatsState = {
  iceCoin: null,
};

function reducer(state = INITIAL_STATE, action: Actions): StatsState {
  return produce(state, draft => {
    switch (action.type) {
      case StatsActions.GET_ICE_COIN_STATS.SUCCESS.type:
        draft.iceCoin = action.payload.config;
        break;
    }
  });
}

export const statsReducer = reducer;
