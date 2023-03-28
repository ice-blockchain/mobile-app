// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {formatNumberString} from '@utils/numbers';
import React, {memo} from 'react';
import {StyleProp, TextStyle} from 'react-native';

interface Props {
  style?: StyleProp<TextStyle>;
  bodyStyle?: StyleProp<TextStyle>;
  decimalsStyle?: StyleProp<TextStyle>;
  value: number;
  signRequired?: boolean;
}

export const MiningRateValue = memo(
  ({style, bodyStyle, decimalsStyle, value, signRequired = false}: Props) => {
    const animatedValue = useAnimatedNumber(
      value,
      initialValue =>
        `${initialValue > 0 && signRequired ? '+' : ''}${formatNumberString(
          String(initialValue),
        )}`,
    );

    return (
      <FormattedNumber
        trim
        containerStyle={style}
        bodyStyle={bodyStyle}
        decimalsStyle={decimalsStyle}
        number={animatedValue}
      />
    );
  },
);
