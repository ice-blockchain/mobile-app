// SPDX-License-Identifier: ice License 1.0

export type MiningRateSummary = {
  amount: string;
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
  miningStarted?: boolean;
};

export type BalanceSummary = {
  preStaking: string;
  standard: string;
  t1: string;
  t2: string;
  total: string;
  totalReferrals: string;
  totalMiningBlockchain: string;
  totalMainnetRewardPoolContribution: string;
};

export type ResurrectRequiredData = {
  amount: string;
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

export type SelfieKycStep = 1;
export type EmotionsKycStep = 2;
export type VerifySocialAccountKycStep = 3;
export type QuizKycStep = 4;
export type DistributionKycStep = 5;

export type FaceAuthKycNumber = SelfieKycStep | EmotionsKycStep;

export type KycStep =
  | SelfieKycStep
  | EmotionsKycStep
  | VerifySocialAccountKycStep
  | QuizKycStep
  | DistributionKycStep;

export type SocialKycStepNumber = number;

export type TotalCoins = {
  blockchain: number;
  preStaking: number;
  standard: number;
  total: number;
  timeSeries: TotalCoinsTimeSeries[];
};

export type TotalCoinsTimeSeries = {
  date: string; // "2022-11-30T16:35:02.996090946Z",
  blockchain: number;
  preStaking: number;
  standard: number;
  total: number;
};
