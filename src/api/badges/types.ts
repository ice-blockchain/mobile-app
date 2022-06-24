// SPDX-License-Identifier: BUSL-1.1

import {ImageSourcePropType} from 'react-native';

export type Badge = {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  progressValue: number;
  progressText: string;
  active: boolean;
  category: BadgeCategory;
};

export type BadgeCategory = 'social' | 'coins' | 'level';
