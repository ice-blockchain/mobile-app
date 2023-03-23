// SPDX-License-Identifier: ice License 1.0

import {font} from '@utils/styles';
import React from 'react';
import {
  I18nManager,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';

type Props = {
  number: number | string;
  containerStyle?: StyleProp<TextStyle>;
  bodyStyle?: StyleProp<TextStyle>;
  decimalsStyle?: StyleProp<TextStyle>;
  trim?: boolean;
  numberOfDecimals?: number;
};

export const FormattedNumber = ({
  number,
  containerStyle,
  bodyStyle,
  decimalsStyle,
  trim = false,
  numberOfDecimals = 2,
}: Props) => {
  const [numberInteger, numberDecimals] = (
    typeof number === 'number' ? number.toLocaleString('en-US') : number
  ).split('.');
  const space = trim ? '' : ' ';
  const hasDecimals = !!numberDecimals;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.integerText, bodyStyle]}>{`${space}${numberInteger}${
        hasDecimals ? '.' : ''
      }`}</Text>
      {hasDecimals && (
        <Text style={[styles.fractionalText, decimalsStyle]}>
          {numberDecimals.substring(0, numberOfDecimals)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  integerText: {
    ...font(17, 20.4, 'bold'),
  },
  fractionalText: {
    ...font(10, 12, 'bold'),
    alignSelf: 'flex-start',
  },
});
