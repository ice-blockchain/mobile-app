// SPDX-License-Identifier: ice License 1.0

import {put} from '@api/client';
import {PreStakingSummary} from '@api/tokenomics/types';

interface Params {
  userId: string;
  allocation: number;
  years: number;
}

export function startOrUpdatePreStaking({userId, allocation, years}: Params) {
  return put<{allocation: number; years: number}, PreStakingSummary>(
    `/tokenomics/${userId}/pre-staking`,
    {allocation, years},
  );
}
