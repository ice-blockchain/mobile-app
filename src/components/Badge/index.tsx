// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

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
    backgroundColor: COLORS.pomegranate,
    height: 16,
    minWidth: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginHorizontal: 4,
  },
});
