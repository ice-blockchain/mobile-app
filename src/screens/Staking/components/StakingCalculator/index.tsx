// SPDX-License-Identifier: BUSL-1.1

import {Calculator} from '@screens/Staking/components/StakingCalculator/components/Calculator';
import React, {memo, useCallback, useState} from 'react';

let timer: null | ReturnType<typeof setTimeout> = null;
export const StakingCalculator = memo(() => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateResult = useCallback(
    ({years, allocation}: {years: number; allocation: number}) => {
      setLoading(true);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setResult(years * allocation * 7120);
        setLoading(false);
      }, 1000);
    },
    [],
  );

  return (
    <Calculator
      onCalculateResult={calculateResult}
      result={result}
      loading={loading}
    />
  );
});
