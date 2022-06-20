// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@components/SegmentedControl';
import {t} from '@utils/i18n';
import {capitalizeFirstLetter} from '@utils/string';
import React from 'react';

export const CATEGORIES = [
  {text: capitalizeFirstLetter(t('global.social')), key: 'social'},
  {text: capitalizeFirstLetter(t('global.coins')), key: 'coins'},
  {text: capitalizeFirstLetter(t('global.level')), key: 'level'},
] as const;

export const CategorySwitcher = (
  props: Omit<SegmentedControlProps, 'segments'>,
) => {
  return <SegmentedControl segments={CATEGORIES} {...props} />;
};
