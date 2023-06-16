// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {
  balanceSummarySelector,
  miningRatesSelector,
} from '@store/modules/Tokenomics/selectors';
import {parseNumber} from '@utils/numbers';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const usePredictedBalanceUpdate = ({
  updateInterval,
}: {
  updateInterval: number;
}) => {
  const balanceSummary = useSelector(balanceSummarySelector);
  const miningRate = useSelector(miningRatesSelector);

  const [predictedBalance, setPredictedBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!balanceSummary || !miningRate) {
      setPredictedBalance(null);
      return;
    }

    if (miningRate.type === 'none') {
      setPredictedBalance(parseNumber(balanceSummary.total));
      return;
    }

    const balance = parseNumber(balanceSummary.total);
    const ratePerHour =
      parseNumber(miningRate.total.amount) *
      (miningRate.type === 'positive' ? 1 : -1);
    const ratePerSecond = ratePerHour / ENV.MINING_RATE_INTERVAL_SEC;

    setPredictedBalance(balance);

    const interval = setInterval(() => {
      setPredictedBalance(currentPredictedBalance =>
        Math.max((currentPredictedBalance ?? balance) + ratePerSecond, 0),
      );
    }, updateInterval);
    return () => clearInterval(interval);
  }, [balanceSummary, miningRate, updateInterval]);

  return {predictedBalance};
};
