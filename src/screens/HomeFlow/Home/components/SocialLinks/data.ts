// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {Images} from '@images';
import {ImageSourcePropType} from 'react-native';

type SocialLinkType =
  | 'TWITTER'
  | 'TELEGRAM'
  | 'YOUTUBE'
  | 'TIKTOK'
  | 'FACEBOOK'
  | 'INSTAGRAM'
  | 'LINKEDIN'
  | 'GITHUB'
  | 'REDDIT';
// | 'DISCORD';

export interface SocialLink {
  type: SocialLinkType;
  icon: ImageSourcePropType;
  linkScheme?: string;
  linkUrl: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    type: 'TWITTER',
    icon: Images.social.icons.twitter,
    linkScheme: LINKS.TWITTER_APP_URL,
    linkUrl: LINKS.TWITTER_PROFILE_URL,
  },
  {
    type: 'TELEGRAM',
    icon: Images.social.icons.telegram,
    linkUrl: LINKS.TELEGRAM_PROFILE_URL,
  },
  {
    type: 'YOUTUBE',
    icon: Images.social.icons.youtube,
    linkScheme: LINKS.YOUTUBE_APP,
    linkUrl: LINKS.YOUTUBE_WEB,
  },
  {
    type: 'TIKTOK',
    icon: Images.social.icons.tiktok,
    linkUrl: LINKS.TIKTOK_WEB,
  },
  {
    type: 'FACEBOOK',
    icon: Images.social.icons.facebook,
    linkScheme: LINKS.FACEBOOK_APP,
    linkUrl: LINKS.FACEBOOK_WEB,
  },
  {
    type: 'INSTAGRAM',
    icon: Images.social.icons.instagram,
    linkScheme: LINKS.INSTAGRAM_APP,
    linkUrl: LINKS.INSTAGRAM_WEB,
  },
  {
    type: 'LINKEDIN',
    icon: Images.social.icons.linkedin,
    linkScheme: LINKS.LINKEDIN_APP,
    linkUrl: LINKS.LINKEDIN_WEB,
  },
  {
    type: 'GITHUB',
    icon: Images.social.icons.github,
    linkUrl: LINKS.GITHUB_WEB,
  },
  {
    type: 'REDDIT',
    icon: Images.social.icons.reddit,
    linkScheme: LINKS.REDDIT_APP,
    linkUrl: LINKS.REDDIT_WEB,
  },
  // {
  //   type: 'DISCORD',
  //   icon: Images.social.icons.discord,
  //   linkScheme: LINKS.DISCORD_APP,
  //   linkUrl: LINKS.DISCORD_WEB,
  // },
];
