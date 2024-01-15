// SPDX-License-Identifier: ice License 1.0

import {BalanceHistoryPoint} from '@api/tokenomics/types';

export const getBalanceHistoryLength = (
  balanceHistory: BalanceHistoryPoint[],
) => {
  return balanceHistory.reduce(
    (total, point) => total + (point.timeSeries?.length ?? 0),
    0,
  );
};
