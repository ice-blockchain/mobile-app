// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import imgFacebook from '@images/social/icons/facebook.png';
import imgGithub from '@images/social/icons/github.png';
import imgInstagram from '@images/social/icons/instagram.png';
import imgLinkedin from '@images/social/icons/linkedin.png';
import imgTelegram from '@images/social/icons/telegram.png';
import imgTiktok from '@images/social/icons/tiktok.png';
import imgTwitter from '@images/social/icons/twitter.png';
import imgYoutube from '@images/social/icons/youtube.png';
import {ImageSourcePropType} from 'react-native';

type SocialLinkType =
  | 'TWITTER'
  | 'TELEGRAM'
  | 'YOUTUBE'
  | 'TIKTOK'
  | 'FACEBOOK'
  | 'INSTAGRAM'
  | 'LINKEDIN'
  | 'GITHUB';

export interface SocialLink {
  type: SocialLinkType;
  icon: ImageSourcePropType;
  linkScheme?: string;
  linkUrl: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    type: 'TWITTER',
    icon: imgTwitter,
    linkScheme: LINKS.TWITTER_APP_URL,
    linkUrl: LINKS.TWITTER_PROFILE_URL,
  },
  {
    type: 'TELEGRAM',
    icon: imgTelegram,
    linkUrl: LINKS.TELEGRAM_PROFILE_URL,
  },
  {
    type: 'YOUTUBE',
    icon: imgYoutube,
    linkScheme: LINKS.YOUTUBE_APP,
    linkUrl: LINKS.YOUTUBE_WEB,
  },
  {
    type: 'TIKTOK',
    icon: imgTiktok,
    linkUrl: LINKS.TIKTOK_WEB,
  },
  {
    type: 'FACEBOOK',
    icon: imgFacebook,
    linkScheme: LINKS.FACEBOOK_APP,
    linkUrl: LINKS.FACEBOOK_WEB,
  },
  {
    type: 'INSTAGRAM',
    icon: imgInstagram,
    linkScheme: LINKS.INSTAGRAM_APP,
    linkUrl: LINKS.INSTAGRAM_WEB,
  },
  {
    type: 'LINKEDIN',
    icon: imgLinkedin,
    linkScheme: LINKS.LINKEDIN_APP,
    linkUrl: LINKS.LINKEDIN_WEB,
  },
  {
    type: 'GITHUB',
    icon: imgGithub,
    linkUrl: LINKS.GITHUB_WEB,
  },
];
