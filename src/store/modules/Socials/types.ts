// SPDX-License-Identifier: ice License 1.0

export type SocialType =
  | 'tiktok'
  | 'youtube'
  | 'linkedin'
  | 'facebook'
  | 'instagram';

export type SocialsShare = {
  type: SocialType;
  dateToShow: string;
  shared: boolean;
};
