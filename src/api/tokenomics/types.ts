// SPDX-License-Identifier: ice License 1.0

export type MiningRateSummary = {
  amount: number;
  bonuses?: {
    extra?: number;
    preStaking?: number;
    t1?: number;
    t2?: number;
    total?: number;
  };
};

export type MiningSession = {
  endedAt: string;
  free: boolean;
  resettableStartingAt: string;
  startedAt: string;
  warnAboutExpirationStartingAt: string;
};

export type MiningSummary = {
  miningRates: {
    base: MiningRateSummary;
    preStaking: MiningRateSummary;
    standard: MiningRateSummary;
    total: MiningRateSummary;
    totalNoPreStakingBonus: MiningRateSummary;
    positiveTotalNoPreStakingBonus: MiningRateSummary;
    type: 'negative' | 'positive' | 'none';
  };
  miningSession: MiningSession | null;
  miningStreak?: number;
  remainingFreeMiningSessions?: number;
  availableExtraBonus?: number;
};

export type BalanceSummary = {
  preStaking: number;
  standard: number;
  t1: number;
  t2: number;
  total: number;
  totalReferrals: number;
};

export type ResurrectRequiredData = {
  amount: number;
  duringTheLastXSeconds: number;
};

export type PreStakingSummary = {
  allocation: number;
  bonus: number;
  years: number;
};

export type RankingSummary = {
  globalRank: number;
};

export type BalanceDiff = {
  amount: string;
  bonus: number;
  negative?: boolean;
};

export type BalanceHistoryPoint = {
  time: string;
  balance: BalanceDiff;
  timeSeries?: BalanceHistoryPoint[];
};
