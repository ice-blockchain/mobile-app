// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {t} from '@translations/i18n';
import {capitalizeFirstLetter} from '@utils/string';
import {ImageSourcePropType} from 'react-native';

export type Badge = {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  progress: number;
  active: boolean;
};

export enum BadgeCategory {
  social = 'social',
  coins = 'coins',
  level = 'level',
}

export const CATEGORIES = [
  {text: capitalizeFirstLetter(t('global.social')), key: BadgeCategory.social},
  {text: capitalizeFirstLetter(t('global.coins')), key: BadgeCategory.coins},
  {text: capitalizeFirstLetter(t('global.level')), key: BadgeCategory.level},
] as const;

export const BADGES: {[key in BadgeCategory]: Badge[]} = {
  social: [
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      imageSource: Images.badges.iceBreaker.active,
      progress: 89.24,
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.badges.troubleMaker.active,
      progress: 11.23,
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.badges.snowyPlow.active,
      progress: 5.67,
      active: true,
    },
    {
      title: 'Frozen Max',
      description: '25-50 ice friends',
      imageSource: Images.badges.frozenMax.active,
      progress: 5.67,
      active: true,
    },
    {
      title: 'Cool Breeze',
      description: '50-100 ice friends',
      imageSource: Images.badges.coolBreeze.inactive,
      progress: 1.04,
      active: false,
    },
    {
      title: 'Big Contender',
      description: '100-250 ice friends',
      imageSource: Images.badges.bigContender.inactive,
      progress: 0.48,
      active: false,
    },
    {
      title: 'Mastermind',
      description: '100-250 ice friends',
      imageSource: Images.badges.mastermind.inactive,
      progress: 0.48,
      active: false,
    },
  ],
  coins: [
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 11.23,
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 42.23,
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 42.23,
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 42.23,
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 42.23,
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 72.23,
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 72.23,
      active: false,
    },
  ],
  level: [
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 26.11,
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 26.11,
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 26.11,
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 26.11,
      active: false,
    },
  ],
};
