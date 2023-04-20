// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  value: number | string;
  style?: StyleProp<ViewStyle>;
};

export const Badge = ({value, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.attentionDark,
    height: rem(16),
    minWidth: rem(16),
    borderRadius: rem(16) / 2,
    justifyContent: 'center',
  },
  valueText: {
    ...font(10, null, 'black', 'white', 'center'),
    marginHorizontal: 3,
  },
});
