// SPDX-License-Identifier: ice License 1.0

import {
  STAKING_ALLOCATION_DEFAULT,
  STAKING_ALLOCATION_MAX,
  STAKING_ALLOCATION_MIN,
  STAKING_YEARS_DEFAULT,
  STAKING_YEARS_MAX,
  STAKING_YEARS_MIN,
} from '@constants/staking';
import {preStakingSummarySelector} from '@store/modules/Tokenomics/selectors';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

export const useCalculatorSliderValues = () => {
  // select without subscription to prevent slider changes on update
  const preStakingSummary = useSelector(preStakingSummarySelector, () => true);

  return useMemo(() => {
    const availableStakingYearsMin = STAKING_YEARS_MIN;
    const availableStakingYearsMax = STAKING_YEARS_MAX;
    const availableYearsPercentage =
      100 -
      ((availableStakingYearsMin - STAKING_YEARS_MIN) /
        (STAKING_YEARS_MAX - STAKING_YEARS_MIN)) *
        100;
    const stakingYearsInitialValue =
      preStakingSummary?.years ?? STAKING_YEARS_DEFAULT;

    const availableAllocationMin = STAKING_ALLOCATION_MIN;
    const availableAllocationMax = STAKING_ALLOCATION_MAX;
    const availableAllocationPercentage =
      100 -
      ((availableAllocationMin - STAKING_ALLOCATION_MIN) /
        (STAKING_ALLOCATION_MAX - STAKING_ALLOCATION_MIN)) *
        100;
    const allocationInitialValue =
      preStakingSummary?.allocation ?? STAKING_ALLOCATION_DEFAULT;

    return {
      availableStakingYearsMin,
      availableStakingYearsMax,
      availableYearsPercentage,
      stakingYearsInitialValue,
      availableAllocationMin,
      availableAllocationMax,
      availableAllocationPercentage,
      allocationInitialValue,
    };
  }, [preStakingSummary]);
};
