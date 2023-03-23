// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@api/badges/types';
import {Images} from '@images';

export const LAST_BADGES: Badge[] = [
  {
    title: 'ice Breaker',
    category: 'social',
    progressText: '2 of 5',
    progressValue: 30,
    imageSource: Images.badges.iceBreaker.active,
    imageInactive: Images.badges.iceBreaker.inactive,
    description: '',
    active: true,
  },
  {
    title: 'Trouble Maker',
    category: 'coins',
    progressText: '3 of 5',
    progressValue: 50,
    imageSource: Images.badges.troubleMaker.active,
    imageInactive: Images.badges.bigContender.inactive,
    description: '',
    active: true,
  },
  {
    title: 'Snowy Plow',
    category: 'level',
    progressText: '2 of 10',
    progressValue: 20,
    imageSource: Images.badges.snowyPlow.active,
    imageInactive: Images.badges.mastermind.inactive,
    description: '',
    active: true,
  },
];
