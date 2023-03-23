// SPDX-License-Identifier: ice License 1.0

import {TierOneIcon} from '@svg/TierOneIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  value: string;
  color: string;
};

export const BarLabel = ({value, color}: Props) => {
  return (
    <View style={styles.container}>
      <TierOneIcon
        color={color}
        width={rem(18)}
        height={rem(18)}
        style={styles.icon}
      />
      <Text style={[styles.dot, {color}]}>●</Text>
      <Text style={[styles.valueText, {color}]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: rem(6),
  },
  icon: {
    marginLeft: -rem(4),
    marginRight: -rem(5),
  },
  dot: {
    ...font(8, 12),
  },
  valueText: {
    marginLeft: rem(5),
    ...font(10, 14, 'bold'),
  },
});
