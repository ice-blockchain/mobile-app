// SPDX-License-Identifier: ice License 1.0

export const socialsOrder = [
  'iceFounderTwitter',
  'tiktok',
  'youtube',
  'linkedin',
  'facebook',
  'instagram',
  'reddit',
  // 'discord',
] as const;

export type SocialType = typeof socialsOrder[number];

export type SocialsShare = {
  type: SocialType;
  dateToShow: string;
  shared: boolean;
};
