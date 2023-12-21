// SPDX-License-Identifier: ice License 1.0

export type CountryStatistics = {
  country: string;
  userCount: number;
};

export type Miner = {
  balance: string;
  profilePictureUrl?: string;
  userId?: string;
  username?: string;
};

export type UserGrowth = {
  active: number; //  0,
  total: number; // 20
  timeSeries: UserGrowthTimeSeries[];
};

export type UserGrowthTimeSeries = {
  date: string; // "2022-11-30T16:35:02.996090946Z",
  active: number; // 0,
  total: number; // 20
};

export type AdoptionMilestone = {
  baseMiningRate: string;
  milestone: number;
  achievedAt?: string;
  totalActiveUsers?: number;
  achievementDate?: string;
};

export type Adoption = {
  milestones: AdoptionMilestone[];
  totalActiveUsers: number;
};

export type TotalCoinsFilter =
  | 'total'
  | 'on-app'
  | 'pre-staked'
  | 'on-blockchain';
