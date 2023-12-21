// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {TotalCoins} from '@api/tokenomics/types';

type Params = {
  days: number;
  tz: string;
};

export function getTotalCoins({days, tz}: Params) {
  return get<TotalCoins>('/tokenomics-statistics/total-coins', {
    days,
    tz,
  });
}
