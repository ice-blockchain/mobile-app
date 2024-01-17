// SPDX-License-Identifier: ice License 1.0

type AuthCodeConfig =
  | {
      emailCodeAuthWhiteList: string[];
    }
  | {
      emailCodeAuthBlackList: string[];
    };

type TeamConfig = {
  team?: {enabled: boolean};
};

type AchievementsConfig = {
  achievements?: {enabled: boolean};
};

type DistributionKyc = {
  'social2-kyc': {
    'x-post-link'?: string;
  };
};

type DynamicDistributionKyc = {
  'dynamic-distribution-kyc': {
    step: number;
    xPostLink?: string;
    xPostExample?: string;
  }[];
};

export type FeatureToggleConfig = AuthCodeConfig &
  TeamConfig &
  AchievementsConfig &
  DistributionKyc &
  DynamicDistributionKyc;
