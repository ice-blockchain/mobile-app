// SPDX-License-Identifier: ice License 1.0

export type FaceAuthConfig = {
  enabled: boolean;
};

export type AuthConfig =
  | {
      emailCodeAuthWhiteList: string[];
      'face-auth': FaceAuthConfig;
    }
  | {
      emailCodeAuthBlackList: string[];
      'face-auth': FaceAuthConfig;
    };
