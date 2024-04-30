// SPDX-License-Identifier: ice License 1.0

import {get, isApiError} from '@api/client';
import {DEFAULT_BACK_OFF_OPTIONS} from '@api/client/backOff';
import {MiningSummary} from '@api/tokenomics/types';

interface Params {
  userId: string;
}

export function getMiningSummary({userId}: Params) {
  return get<MiningSummary>(`/tokenomics/${userId}/mining-summary`, null, {
    ...DEFAULT_BACK_OFF_OPTIONS,
    retry: error =>
      DEFAULT_BACK_OFF_OPTIONS.retry(error) ||
      isApiError(error, 404, 'USER_NOT_FOUND'),
  });
}
