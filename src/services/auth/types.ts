// SPDX-License-Identifier: ice License 1.0

export type AuthToken =
  | {
      accessToken: string;
      issuer: 'firebase';
    }
  | {
      accessToken: string;
      refreshToken: string;
      issuer: 'custom';
    };
