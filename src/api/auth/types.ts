// SPDX-License-Identifier: ice License 1.0

type AuthCodeConfig =
  | {
      emailCodeAuthWhiteList: string[];
    }
  | {
      emailCodeAuthBlackList: string[];
    };

type FaceAuthConfig = {
  'face-auth'?: {enabled: boolean};
};

type TeamConfig = {
  team?: {enabled: boolean};
};

type AchievementsConfig = {
  achievements?: {enabled: boolean};
};

type EthDistributionKyc = {
  'social2-kyc': {
    enabled: boolean;
    'x-post-link'?: string;
  };
};

export type AuthConfig = AuthCodeConfig &
  FaceAuthConfig &
  TeamConfig &
  AchievementsConfig &
  EthDistributionKyc;
