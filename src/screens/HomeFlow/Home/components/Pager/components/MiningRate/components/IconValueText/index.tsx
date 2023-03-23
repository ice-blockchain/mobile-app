// SPDX-License-Identifier: ice License 1.0

import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {formatNumber} from '@utils/numbers';
import React, {memo} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

interface Props {
  style: StyleProp<TextStyle>;
  value: number;
}

export const IconValueText = memo(({style, value}: Props) => {
  const animatedValue = useAnimatedNumber(value, initialValue =>
    formatNumber(initialValue, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
  );

  return <Text style={style}>{`+${animatedValue}%`}</Text>;
});
