// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {Miner} from '@api/statistics/types';

type Params = {
  query: string;
  limit?: number;
  offset?: number;
};

export function getTopMiners({query, offset, limit}: Params) {
  return get<Miner[]>('/tokenomics-statistics/top-miners', {
    keyword: query,
    offset,
    limit,
  });
}
