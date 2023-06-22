// SPDX-License-Identifier: ice License 1.0

export type CountryStatistics = {
  country: string;
  userCount: number;
};

export type Miner = {
  balance: number;
  profilePictureUrl?: string;
  userId?: string;
  username?: string;
};

export type UserGrowth = {
  active: number; //  0,
  total: number; // 20
  timeSeries: TimeSeries[];
};

export type TimeSeries = {
  date: string; // "2022-11-30T16:35:02.996090946Z",
  active: number; // 0,
  total: number; // 20
};

export type AdoptionMilestone = {
  baseMiningRate: number;
  milestone: number;
  achievedAt?: string;
  totalActiveUsers?: number;
};

export type Adoption = {
  milestones: AdoptionMilestone[];
  totalActiveUsers: number;
};
