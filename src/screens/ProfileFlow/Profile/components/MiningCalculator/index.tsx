// SPDX-License-Identifier: BUSL-1.1

import {Calculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator/components/Calculator';
import {SectionHeader} from '@screens/ProfileFlow/Profile/components/SectionHeader';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useState} from 'react';

let timer: null | ReturnType<typeof setTimeout> = null;
export const MiningCalculator = memo(() => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateResult = useCallback(
    ({
      tierOneValue,
      tierTwoValue,
      activeMinersPerc,
    }: {
      tierOneValue: number;
      tierTwoValue: number;
      activeMinersPerc: number;
    }) => {
      setLoading(true);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setResult(tierOneValue * tierTwoValue * activeMinersPerc);
        setLoading(false);
      }, 1000);
    },
    [],
  );

  return (
    <>
      <SectionHeader
        title={t('profile.mining_calculator').toUpperCase()}
        showViewAll={false}
      />
      <Calculator
        onCalculateResult={calculateResult}
        result={result}
        loading={loading}
      />
    </>
  );
});
