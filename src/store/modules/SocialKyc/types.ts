// SPDX-License-Identifier: ice License 1.0

export type BaseStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
export type SocialKycStatus = BaseStatus | 'FAILED';
export type GetSocialKycRepostTextStatus = BaseStatus;
export type SocialKycMethod = 'Facebook' | 'X';
