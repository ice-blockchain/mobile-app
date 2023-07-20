// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {
  balanceSummarySelector,
  miningRatesSelector,
} from '@store/modules/Tokenomics/selectors';
import {isFailedSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {parseNumber} from '@utils/numbers';
import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

export const usePredictedBalanceUpdate = ({
  updateInterval,
}: {
  updateInterval: number;
}) => {
  const prevRealBalance = useRef<number | null>(null);

  const balanceSummary = useSelector(balanceSummarySelector);
  const miningRate = useSelector(miningRatesSelector);

  const getBalanceSummaryFailed = useSelector(
    isFailedSelector.bind(null, TokenomicsActions.GET_BALANCE_SUMMARY),
  );

  const getMiningSummaryFailed = useSelector(
    isFailedSelector.bind(null, TokenomicsActions.GET_MINING_SUMMARY),
  );

  const [predictedBalance, setPredictedBalance] = useState<number | null>(null);

  useEffect(() => {
    /**
     * Instead of using the whole balanceSummary and miningRate objects,
     * Using only specific props to skip unnecessary useEffect calls
     */
    if (
      balanceSummary?.total == null ||
      miningRate?.type == null ||
      miningRate?.total.amount == null
    ) {
      setPredictedBalance(null);
      return;
    }

    /**
     * If the balance or mining rate is failed to update, stop predictions
     */
    if (getBalanceSummaryFailed || getMiningSummaryFailed) {
      return;
    }

    if (miningRate.type === 'none') {
      setPredictedBalance(parseNumber(balanceSummary.total));
      return;
    }

    const realBalance = parseNumber(balanceSummary.total);
    const ratePerHour =
      parseNumber(miningRate.total.amount) *
      (miningRate.type === 'positive' ? 1 : -1);
    const ratePerSecond = ratePerHour / ENV.MINING_RATE_INTERVAL_SEC;

    /**
     * If BE returns the same balance, keep the predicted one
     */
    setPredictedBalance(currentPredictedBalance => {
      if (prevRealBalance.current !== realBalance) {
        prevRealBalance.current = realBalance;
        return realBalance;
      }
      return currentPredictedBalance;
    });

    const interval = setInterval(() => {
      setPredictedBalance(currentPredictedBalance =>
        Math.max((currentPredictedBalance ?? realBalance) + ratePerSecond, 0),
      );
    }, updateInterval);
    return () => clearInterval(interval);
  }, [
    balanceSummary?.total,
    miningRate?.type,
    miningRate?.total.amount,
    updateInterval,
    getBalanceSummaryFailed,
    getMiningSummaryFailed,
  ]);

  return {predictedBalance};
};
