// SPDX-License-Identifier: ice License 1.0

import {get, isApiError} from '@api/client';
import {DEFAULT_BACK_OFF_OPTIONS} from '@api/client/backOff';
import {BalanceHistoryPoint} from '@api/tokenomics/types';

type Params = {
  userId: string;
  startDate?: string | null;
  endDate?: string | null;
  limit?: number | null;
  offset?: number | null;
  tz: string;
};

export function getBalanceHistory({
  userId,
  startDate,
  endDate,
  limit,
  offset,
  tz,
}: Params) {
  return get<BalanceHistoryPoint[] | null>(
    `/tokenomics/${userId}/balance-history`,
    {
      startDate,
      endDate,
      limit,
      offset,
      tz,
    },
    {
      ...DEFAULT_BACK_OFF_OPTIONS,
      retry: error =>
        DEFAULT_BACK_OFF_OPTIONS.retry(error) ||
        isApiError(error, 404, 'USER_NOT_FOUND'),
    },
  );
}
