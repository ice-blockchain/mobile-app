// SPDX-License-Identifier: ice License 1.0

import {miningRatesSelector} from '@store/modules/Tokenomics/selectors';
import {calculateMiningRate} from '@store/modules/Tokenomics/utils/calculateMiningRate';
import {parseNumber} from '@utils/numbers';
import {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

export const useMiningCalculator = () => {
  const miningRates = useSelector(miningRatesSelector);

  const [calculatedResults, setCalculatedResults] = useState<{
    miningRate: number;
  } | null>(null);

  const onParametersChange = useCallback(
    ({
      tierOneValue,
      activeMinersPerc,
    }: {
      tierOneValue: number;
      activeMinersPerc: number;
    }) => {
      if (!miningRates) {
        return;
      }
      const baseMiningRate = parseNumber(miningRates.base.amount);

      const {miningRate} = calculateMiningRate({
        baseMiningRate,
        tierOneReferralsCount: tierOneValue,
        activeMinersPercentage: activeMinersPerc,
      });

      setCalculatedResults({miningRate});
    },
    [miningRates],
  );

  return {calculatedResults, onParametersChange};
};
