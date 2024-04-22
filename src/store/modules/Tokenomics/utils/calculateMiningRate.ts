// SPDX-License-Identifier: ice License 1.0

export const calculateMiningRate = ({
  baseMiningRate,
  tierOneReferralsCount,
  activeMinersPercentage,
}: {
  baseMiningRate: number;
  tierOneReferralsCount: number;
  activeMinersPercentage: number;
}) => {
  const miningRate =
    baseMiningRate *
    (1 + (tierOneReferralsCount * 0.25 * activeMinersPercentage) / 100);
  return {miningRate};
};
