// SPDX-License-Identifier: ice License 1.0

import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {formatNumber} from '@utils/numbers';
import React, {FC, memo} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

interface Props {
  value: number;
  textDecorator?: (animatedValue: number) => string | number;
  NumberComponent?: FC<{animatedValue: number}>;
  style?: StyleProp<TextStyle>;
}

export const AnimatedNumberText = memo(
  ({value, textDecorator = formatNumber, NumberComponent, style}: Props) => {
    const animatedValue = useAnimatedNumber(value);

    if (NumberComponent) {
      return <NumberComponent animatedValue={animatedValue} />;
    }
    return <Text style={style}>{textDecorator(animatedValue)}</Text>;
  },
);
