// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {useIsFocused} from '@react-navigation/native';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {
  balanceSummarySelector,
  miningRatesSelector,
} from '@store/modules/Tokenomics/selectors';
import {isFailedSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {parseNumber} from '@utils/numbers';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const usePredictedBalanceUpdate = ({
  updateInterval,
}: {
  updateInterval: number;
}) => {
  const isScreenFocused = useIsFocused();

  const balanceSummary = useSelector(balanceSummarySelector);
  const miningRate = useSelector(miningRatesSelector);

  const getBalanceSummaryFailed = useSelector(
    isFailedSelector.bind(null, TokenomicsActions.GET_BALANCE_SUMMARY),
  );

  const [predictedBalance, setPredictedBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!balanceSummary || !miningRate) {
      setPredictedBalance(null);
      return;
    }

    if (miningRate.type === 'none' || !isScreenFocused) {
      setPredictedBalance(parseNumber(balanceSummary.total));
      return;
    }

    /**
     * If the balance is failed to update, stop predictions
     */
    if (getBalanceSummaryFailed) {
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
  }, [
    balanceSummary,
    miningRate,
    updateInterval,
    isScreenFocused,
    getBalanceSummaryFailed,
  ]);

  return {predictedBalance};
};
