// SPDX-License-Identifier: ice License 1.0

import {UserGrowthTimeSeries} from '@api/statistics/types';
import {StatsPeriod} from '@store/modules/Stats/types';
import {RootState} from '@store/rootReducer';

export const getUserGrowthStatsSelector =
  (period: StatsPeriod) =>
  (state: RootState): UserGrowthTimeSeries[] => {
    return state.stats.userGrowth.timeSeriesStatsMap[period] ?? [];
  };

export const totalActiveUsersSelector = (state: RootState) =>
  state.stats.userGrowth.active;

export const totalUsersSelector = (state: RootState) =>
  state.stats.userGrowth.total;

export const adoptionSelector = (state: RootState) => state.stats.adoption;
