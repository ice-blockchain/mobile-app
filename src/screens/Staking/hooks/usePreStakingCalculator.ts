// SPDX-License-Identifier: ice License 1.0

import {miningRatesSelector} from '@store/modules/Tokenomics/selectors';
import {calculateStakingBonus} from '@store/modules/Tokenomics/utils/calculateStakingBonus';
import {parseNumber} from '@utils/numbers';
import {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

export const usePreStakingCalculator = () => {
  const miningRates = useSelector(miningRatesSelector);

  const [calculatedResults, setCalculatedResults] = useState<{
    miningRate: number;
    bonus: number;
  } | null>(null);

  const parameters = useRef<{years: number; allocation: number} | null>(null);

  const onParametersChange = useCallback(
    ({years, allocation}: {years: number; allocation: number}) => {
      parameters.current = {years, allocation};

      if (!miningRates) {
        return;
      }

      const noPreStakingBonus = parseNumber(
        miningRates.positiveTotalNoPreStakingBonus.amount,
      );

      const {miningRate, bonus} = calculateStakingBonus({
        noPreStakingBonus,
        allocation,
        years,
      });

      setCalculatedResults({miningRate, bonus});
    },
    [miningRates],
  );

  return {calculatedResults, parameters, onParametersChange};
};
