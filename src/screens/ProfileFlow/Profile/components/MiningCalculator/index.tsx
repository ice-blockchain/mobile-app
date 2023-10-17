// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {isLiteTeam} from '@constants/featureFlags';
import {Calculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator/components/Calculator';
import {CalculatorLite} from '@screens/ProfileFlow/Profile/components/MiningCalculator/components/CalculatorLite';
import {useMiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator/hooks/useMiningCalculator';
import {t} from '@translations/i18n';
import React, {memo} from 'react';

export const MiningCalculator = memo(() => {
  const {calculatedResults, onParametersChange} = useMiningCalculator();

  return (
    <>
      <SectionHeader title={t('profile.mining_calculator')} />
      {isLiteTeam ? (
        <CalculatorLite
          onParametersChange={onParametersChange}
          result={calculatedResults?.miningRate ?? null}
        />
      ) : (
        <Calculator
          onParametersChange={onParametersChange}
          result={calculatedResults?.miningRate ?? null}
        />
      )}
    </>
  );
});
