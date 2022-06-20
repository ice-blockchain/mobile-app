// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@components/SegmentedControl';
import {t} from '@utils/i18n';
import {capitalizeFirstLetter} from '@utils/string';
import React from 'react';

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

export const CategorySwitcher = (
  props: Omit<SegmentedControlProps, 'segments'>,
) => {
  return <SegmentedControl initialIndex={0} segments={CATEGORIES} {...props} />;
};
