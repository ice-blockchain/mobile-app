// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {MiningSummary} from '@api/tokenomics/types';

interface Params {
  userId: string;
  resurrect?: boolean | null;
}

export function startMiningSession({userId, resurrect}: Params) {
  return post<{resurrect?: boolean | null}, MiningSummary | null>(
    `/tokenomics/${userId}/mining-sessions`,
    {resurrect},
  );
}
