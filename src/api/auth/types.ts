// SPDX-License-Identifier: ice License 1.0

export type AuthConfig =
  | {
      emailCodeAuthWhiteList: string[];
    }
  | {
      emailCodeAuthBlackList: string[];
    };
