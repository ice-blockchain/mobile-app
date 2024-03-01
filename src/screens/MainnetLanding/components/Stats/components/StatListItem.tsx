// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  Icon: ReactNode;
  label: string;
  value: string;
};

export const StatListItem = memo(({Icon, label, value}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{Icon}</View>
      <View style={styles.body}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: COLORS.aliceBlue,
    width: rem(44),
    height: rem(44),
    borderRadius: rem(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginStart: rem(12),
  },
  labelText: {
    ...font(12, undefined, 'medium', 'secondary'),
  },
  valueText: {
    ...font(17, undefined, 'bold', 'primaryDark'),
    marginTop: rem(4),
  },
});
