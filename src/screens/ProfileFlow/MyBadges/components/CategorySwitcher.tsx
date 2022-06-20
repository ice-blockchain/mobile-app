// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@components/SegmentedControl';
import React from 'react';

export const CATEGORIES = [
  {text: 'global.social', key: 'social'},
  {text: 'global.coins', key: 'coins'},
  {text: 'global.level', key: 'level'},
] as const;

export const CategorySwitcher = (
  props: Omit<SegmentedControlProps, 'segments'>,
) => {
  return <SegmentedControl segments={CATEGORIES} {...props} />;
};
