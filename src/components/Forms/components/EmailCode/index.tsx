// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  code: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const EmailCode = ({code, containerStyle}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {code
        .toString()
        .split('')
        .map((digit, index) => (
          <View style={styles.digit} key={index}>
            <Text style={styles.digitsText}>{digit}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
  },
  digit: {
    marginHorizontal: rem(6),
    width: rem(46),
    height: rem(50),
    borderRadius: rem(16),
    borderWidth: 1,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitsText: {
    ...font(24, 26, 'bold', 'primaryLight'),
  },
});
