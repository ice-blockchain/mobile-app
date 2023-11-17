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

type FaceDetectionConfig = {
  'face-detection'?: {enabled: boolean};
};

export type AuthConfig = AuthCodeConfig &
  FaceAuthConfig &
  TeamConfig &
  AchievementsConfig &
  FaceDetectionConfig;
