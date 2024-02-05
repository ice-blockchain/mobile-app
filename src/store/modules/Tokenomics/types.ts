// SPDX-License-Identifier: ice License 1.0

import {BarGraphData} from '@components/BarGraph/types';

export type MiningState =
  | 'inactive'
  | 'active'
  | 'restart'
  | 'expire'
  | 'holidayActive'
  | 'holidayRestart'
  | 'holidayExpire'
  | 'disabled';

export type TotalCoinsBarGraphData = {
  blockchainData: BarGraphData[];
  preStakingData: BarGraphData[];
  standardData: BarGraphData[];
  totalData: BarGraphData[];
};
