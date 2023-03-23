// SPDX-License-Identifier: ice License 1.0

import {DEFAULT_BACK_OFF_OPTIONS, get, isApiError} from '@api/client';
import {PreStakingSummary} from '@api/tokenomics/types';

interface Params {
  userId: string;
}

export function getPreStakingSummary({userId}: Params) {
  return get<PreStakingSummary>(
    `/tokenomics/${userId}/pre-staking-summary`,
    null,
    {
      ...DEFAULT_BACK_OFF_OPTIONS,
      retry: error =>
        DEFAULT_BACK_OFF_OPTIONS.retry(error) ||
        isApiError(error, 404, 'USER_NOT_FOUND'),
    },
  );
}
