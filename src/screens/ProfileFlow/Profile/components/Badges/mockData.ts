// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {ImageSourcePropType} from 'react-native';

export type BadgeCategory = {
  title: string;
  category: string;
  imageSource: ImageSourcePropType;
  progressValue: number;
  progressText: string;
};

export const BADGE_CATEGORIES: BadgeCategory[] = [
  {
    title: 'Ice Breaker',
    category: 'Social',
    progressText: '2 of 5',
    progressValue: 30,
    imageSource: Images.badges.iceBreaker.active,
  },
  {
    title: 'Trouble Maker',
    category: 'Coins',
    progressText: '3 of 5',
    progressValue: 50,
    imageSource: Images.badges.troubleMaker.active,
  },
  {
    title: 'Snowy Plow',
    category: 'Level',
    progressText: '2 of 10',
    progressValue: 20,
    imageSource: Images.badges.snowyPlow.active,
  },
];
