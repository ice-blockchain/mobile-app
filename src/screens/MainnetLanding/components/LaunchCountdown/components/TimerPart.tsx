// SPDX-License-Identifier: ice License 1.0

import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  label: string;
  value: string | number;
};

export const TimerPart = ({label, value}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: rem(10),
  },
  labelText: {
    ...font(12, undefined, 'regular', 'periwinkleGray'),
  },
  valueText: {
    ...font(15, undefined, 'bold', 'white'),
  },
});
