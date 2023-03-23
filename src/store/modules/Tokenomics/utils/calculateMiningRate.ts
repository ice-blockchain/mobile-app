// SPDX-License-Identifier: ice License 1.0

export const calculateMiningRate = ({
  baseMiningRate,
  tierOneReferralsCount,
  tierTwoReferralsCount,
  activeMinersPercentage,
}: {
  baseMiningRate: number;
  tierOneReferralsCount: number;
  tierTwoReferralsCount: number;
  activeMinersPercentage: number;
}) => {
  const miningRate =
    baseMiningRate *
    (1 +
      ((tierOneReferralsCount * 0.25 + tierTwoReferralsCount * 0.05) *
        activeMinersPercentage) /
        100);
  return {miningRate};
};
