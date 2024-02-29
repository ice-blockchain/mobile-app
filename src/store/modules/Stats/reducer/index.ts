// SPDX-License-Identifier: ice License 1.0

import {StatsActions} from '@store/modules/Stats/actions';
import {IceCoinStats} from '@store/modules/Stats/types';
import produce from 'immer';

export interface StatsState {
  iceCoin: IceCoinStats | null;
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
        draft.iceCoin = action.payload.stats;
        break;
    }
  });
}

export const statsReducer = reducer;
