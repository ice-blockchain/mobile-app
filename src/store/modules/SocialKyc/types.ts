// SPDX-License-Identifier: ice License 1.0

export type BaseStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
export type SocialKycStatus = BaseStatus | 'FAILED' | 'SKIPPABLE_ERROR';
export type GetSocialKycRepostTextStatus = BaseStatus | 'SKIPPABLE_ERROR';
export type SocialKycMethod = 'Facebook' | 'X';
