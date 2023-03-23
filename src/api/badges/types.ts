// SPDX-License-Identifier: ice License 1.0

import {ImageSourcePropType} from 'react-native';

export type Badge = {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  progressValue: number;
  progressText: string;
  active: boolean;
  category: BadgeCategory;
  imageInactive?: ImageSourcePropType;
};

export type BadgeCategory = 'social' | 'coins' | 'level';
