// SPDX-License-Identifier: BUSL-1.1

import {SegmentedControl} from '@components/SegmentedControl';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const CATEGORIES = [
  {text: 'social', key: 'social'},
  {text: 'coins', key: 'coins'},
  {text: 'level', key: 'level'},
] as const;

export const CategorySwitcher = ({style}: Props) => {
  return <SegmentedControl segments={CATEGORIES} style={style} />;
};
