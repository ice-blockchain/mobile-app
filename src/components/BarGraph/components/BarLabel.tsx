// SPDX-License-Identifier: ice License 1.0

import {CoinsStackSmallIcon} from '@svg/CoinsStackSmallIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export type StatsType = 'active_users' | 'total_coins';

type Props = {
  value: string;
  color: string;
  type?: StatsType;
};

export const BarLabel = ({value, color, type = 'active_users'}: Props) => {
  return (
    <View style={styles.container}>
      {type === 'total_coins' && (
        <CoinsStackSmallIcon
          width={rem(14)}
          height={rem(14)}
          color={color}
          style={styles.icon}
        />
      )}
      {type === 'active_users' && (
        <>
          <TierOneIcon
            color={color}
            width={rem(18)}
            height={rem(18)}
            style={styles.icon}
          />
          <Text style={[styles.dot, {color}]}>●</Text>
        </>
      )}

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
