// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {Calculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator/components/Calculator';
import {useMiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator/hooks/useMiningCalculator';
import {t} from '@translations/i18n';
import React, {memo} from 'react';

export const MiningCalculator = memo(() => {
  const {calculatedResults, onParametersChange} = useMiningCalculator();

  return (
    <>
      <SectionHeader title={t('profile.mining_calculator')} />
      <Calculator
        onParametersChange={onParametersChange}
        result={calculatedResults?.miningRate ?? null}
      />
    </>
  );
});
