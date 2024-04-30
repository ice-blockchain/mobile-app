// SPDX-License-Identifier: ice License 1.0

import {Adoption, UserGrowthTimeSeries} from '@api/statistics/types';
import {StatsActions} from '@store/modules/Stats/actions';
import produce from 'immer';

export interface StatsState {
  userGrowth: {
    timeSeriesStatsMap: {[key: number]: UserGrowthTimeSeries[]};
    active: number;
    total: number;
  };
  adoption: Adoption | null;
}

type Actions = ReturnType<
  | typeof StatsActions.GET_USER_GROWTH_STATS.SUCCESS.create
  | typeof StatsActions.GET_ADOPTION.SUCCESS.create
>;

const INITIAL_STATE: StatsState = {
  userGrowth: {
    timeSeriesStatsMap: {},
    active: 0,
    total: 0,
  },
  adoption: null,
};

function reducer(state = INITIAL_STATE, action: Actions): StatsState {
  return produce(state, draft => {
    switch (action.type) {
      case StatsActions.GET_USER_GROWTH_STATS.SUCCESS.type: {
        const {statsPeriod, userGrowth} = action.payload;
        draft.userGrowth.timeSeriesStatsMap[statsPeriod] =
          userGrowth.timeSeries;
        draft.userGrowth.active = userGrowth.active;
        draft.userGrowth.total = userGrowth.total;
        break;
      }
      case StatsActions.GET_ADOPTION.SUCCESS.type: {
        draft.adoption = action.payload.adoption;
        break;
      }
    }
  });
}

export const statsReducer = reducer;
