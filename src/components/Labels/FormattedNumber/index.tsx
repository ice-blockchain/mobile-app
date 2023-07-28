// SPDX-License-Identifier: ice License 1.0

import {FORCE_LTR_TEXT_CHAR} from '@constants/rtl';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';

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
      <Text style={[styles.integerText, bodyStyle]}>{`${
        isRTL ? space : ''
      }${FORCE_LTR_TEXT_CHAR}${numberInteger}${isRTL ? '' : space}`}</Text>
      {hasDecimals && <Text style={[styles.dot, bodyStyle]}>.</Text>}
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
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
  dot: {
    ...font(17, 22, 'bold'),
    alignSelf: 'flex-end',
  },
  integerText: {
    ...font(17, 22, 'bold'),
  },
  fractionalText: {
    ...font(10, 12, 'bold'),
    alignSelf: 'flex-start',
  },
});
