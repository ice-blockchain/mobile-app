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
const facebookDescription = () => {
  return `${t('social_media.facebook.description_part1')}\n\n${t(
    'social_media.facebook.description_part2',
  )}`;
};

const instagramDescription = () => {
  return `${t('social_media.instagram.description_part1')}\n\n${t(
    'social_media.instagram.description_part2',
  )}`;
};

export const socialData: Record<SocialType, SocialData> = {
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
    description: facebookDescription(),
    buttonTitle: t('button.follow_us'),
    linkApp: LINKS.FACEBOOK_APP,
    linkWeb: LINKS.FACEBOOK_WEB,
  },
  instagram: {
    image: Images.social.instagram,
    title: t('social_media.instagram.title'),
    description: instagramDescription(),
    buttonTitle: t('button.follow_us'),
    linkApp: LINKS.INSTAGRAM_APP,
    linkWeb: LINKS.INSTAGRAM_WEB,
  },
};
