// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
  currency?: string | ReactNode;
};

export const DataCell = ({icon, label, value, currency}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.value}>
        {typeof value === 'string' ? (
          <Text style={styles.valueText}>{value}</Text>
        ) : (
          value
        )}
        {!!currency && <Text style={styles.valueText}> {currency}</Text>}
      </View>
    </View>
  );
};

export const DataCellSeparator = () => <View style={styles.cellSeparator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    width: rem(36),
    height: rem(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(12),
    backgroundColor: COLORS.aliceBlue,
  },
  labelText: {
    marginTop: rem(8),
    ...font(12, 15, 'medium'),
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  value: {
    marginTop: rem(4),
    flexDirection: 'row',
  },
  valueText: {
    ...font(15, 18, 'bold'),
  },
  cellSeparator: {
    width: 1,
    backgroundColor: COLORS.periwinkleGray,
    marginTop: rem(14),
    height: rem(40),
  },
});
