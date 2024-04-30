// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {Images} from '@images';
import {SocialType} from '@store/modules/Socials/types';
import {t} from '@translations/i18n';
import {ImageSourcePropType} from 'react-native';

export interface SocialData {
  image: ImageSourcePropType;
  title: string;
  description: string;
  buttonTitle: string;
  linkApp: string;
  linkWeb: string;
}

export const socialTypesOrder = [
  'iceFounderTwitter',
  'tiktok',
  'youtube',
  'linkedin',
  'facebook',
  'instagram',
  'reddit',
  // 'discord',
] as const;

export const socialData: Record<SocialType, SocialData> = {
  iceFounderTwitter: {
    image: Images.social.twitter,
    title: t('social_media.ice_founder_twitter.title'),
    description: t('social_media.ice_founder_twitter.description'),
    buttonTitle: t('social_media.ice_founder_twitter.button'),
    linkApp: LINKS.TWITTER_ICE_FOUNDER_APP_URL,
    linkWeb: LINKS.TWITTER_ICE_FOUNDER_WEB_URL,
  },
  tiktok: {
    image: Images.social.tiktok,
    title: t('social_media.tiktok.title'),
    description: t('social_media.tiktok.description'),
    buttonTitle: t('button.follow_us'),
    linkApp: LINKS.TIKTOK_WEB,
    linkWeb: LINKS.TIKTOK_WEB,
  },
  youtube: {
    image: Images.social.youtube,
    title: t('social_media.youtube.title'),
    description: t('social_media.youtube.description'),
    buttonTitle: t('button.subscribe'),
    linkApp: LINKS.YOUTUBE_APP,
    linkWeb: LINKS.YOUTUBE_WEB,
  },
  linkedin: {
    image: Images.social.linkedin,
    title: t('social_media.linkedin.title'),
    description: t('social_media.linkedin.description'),
    buttonTitle: t('button.follow_us'),
    linkApp: LINKS.LINKEDIN_APP,
    linkWeb: LINKS.LINKEDIN_WEB,
  },
  facebook: {
    image: Images.social.facebook,
    title: t('social_media.facebook.title'),
    description: `${t('social_media.facebook.description_part1')}\n\n${t(
      'social_media.facebook.description_part2',
    )}`,
    buttonTitle: t('button.follow_us'),
    linkApp: LINKS.FACEBOOK_APP,
    linkWeb: LINKS.FACEBOOK_WEB,
  },
  instagram: {
    image: Images.social.instagram,
    title: t('social_media.instagram.title'),
    description: `${t('social_media.instagram.description_part1')}\n\n${t(
      'social_media.instagram.description_part2',
    )}`,
    buttonTitle: t('button.follow_us'),
    linkApp: LINKS.INSTAGRAM_APP,
    linkWeb: LINKS.INSTAGRAM_WEB,
  },
  reddit: {
    image: Images.social.reddit,
    title: t('social_media.reddit.title'),
    description: t('social_media.reddit.description'),
    buttonTitle: t('button.follow_us'),
    linkApp: LINKS.REDDIT_APP,
    linkWeb: LINKS.REDDIT_WEB,
  },
  // discord: {
  //   image: Images.social.discord,
  //   title: t('social_media.discord.title'),
  //   description: t('social_media.discord.description'),
  //   buttonTitle: t('button.follow_us'),
  //   linkApp: LINKS.DISCORD_APP,
  //   linkWeb: LINKS.DISCORD_WEB,
  // },
};
