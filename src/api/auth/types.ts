// SPDX-License-Identifier: ice License 1.0

export type AuthConfig =
  | {
      customEmailAuthWhiteList: string[];
    }
  | {
      customEmailAuthBlackList: string[];
    };
