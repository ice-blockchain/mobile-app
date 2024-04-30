// SPDX-License-Identifier: ice License 1.0

import {BarGraphData} from '@components/BarGraph/types';
import {STATS_PERIODS} from '@store/modules/Stats/constants';

export type StatsPeriod = typeof STATS_PERIODS[number];

export type UsersBarGraphData = {
  activeUsersData: BarGraphData[];
  totalUsersData: BarGraphData[];
};
