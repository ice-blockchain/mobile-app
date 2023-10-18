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

export type AuthConfig = AuthCodeConfig & FaceAuthConfig & TeamConfig;
