// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@api/badges/types';
import {Images} from '@images';

export const LAST_BADGES: Badge[] = [
  {
    title: 'Ice Breaker',
    category: 'social',
    progressText: '2 of 5',
    progressValue: 30,
    imageSource: Images.badges.iceBreaker.active,
    description: '',
    active: true,
  },
  {
    title: 'Trouble Maker',
    category: 'coins',
    progressText: '3 of 5',
    progressValue: 50,
    imageSource: Images.badges.troubleMaker.active,
    description: '',
    active: true,
  },
  {
    title: 'Snowy Plow',
    category: 'level',
    progressText: '2 of 10',
    progressValue: 20,
    imageSource: Images.badges.snowyPlow.active,
    description: '',
    active: true,
  },
];
