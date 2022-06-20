// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {BadgeCategory} from '@screens/ProfileFlow/MyBadges/components/CategorySwitcher';
import {ImageSourcePropType} from 'react-native';

export type Badge = {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  progress: number;
  active: boolean;
};

export const BADGES: {[key in BadgeCategory]: Badge[]} = {
  social: [
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 72.23,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 72.23,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 72.23,
      active: false,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      imageSource: Images.roles.ambassador,
      progress: 72.23,
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
  ],
};
