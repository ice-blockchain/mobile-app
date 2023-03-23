// SPDX-License-Identifier: ice License 1.0

import {PRE_STAKING_BONUS_FOR_YEARS} from '@constants/staking';

export const calculateStakingBonus = ({
  noPreStakingBonus,
  allocation,
  years,
}: {
  noPreStakingBonus: number;
  allocation: number;
  years: number;
}) => {
  const preStakingBonusForYears =
    PRE_STAKING_BONUS_FOR_YEARS[
      years as keyof typeof PRE_STAKING_BONUS_FOR_YEARS
    ];

  const miningRate =
    (noPreStakingBonus * (100 - allocation)) / 100 +
    (noPreStakingBonus * allocation * (100 + preStakingBonusForYears)) / 10000;

  const bonus = Math.round((miningRate * 100) / noPreStakingBonus - 100);

  return {miningRate, bonus};
};
