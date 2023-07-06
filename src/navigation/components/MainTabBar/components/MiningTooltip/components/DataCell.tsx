// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  icon: ReactNode;
  label: string;
  value: string | number | ReactNode;
  currency?: string | ReactNode;
  row?: boolean;
};

export const DataCell = ({icon, label, value, currency, row}: Props) => {
  return (
    <View style={[styles.container, row ? styles.rowContainer : null]}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={row ? styles.dataRowContainer : styles.dataContainer}>
        <Text style={[styles.labelText, row ? styles.textRow : null]}>
          {label}
        </Text>
        <View style={styles.value}>
          {typeof value === 'string' || typeof value === 'number' ? (
            <Text style={styles.valueText}>{value}</Text>
          ) : (
            value
          )}
          <Text style={styles.valueText}> {currency}</Text>
        </View>
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dataContainer: {
    alignItems: 'center',
    marginTop: rem(10),
  },
  dataRowContainer: {
    paddingLeft: rem(16),
  },
  iconWrapper: {
    width: rem(44),
    height: rem(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(11),
    backgroundColor: COLORS.aliceBlue,
  },
  labelText: {
    ...font(12, 16, 'medium', 'secondary', 'center'),
    textTransform: 'uppercase',
  },
  textRow: {
    textAlign: isRTL ? 'right' : 'left',
  },
  value: {
    marginTop: rem(4),
    flexDirection: 'row',
  },
  valueText: {
    ...font(17, 22, 'bold', 'primaryDark'),
  },
  cellSeparator: {
    width: 1,
    backgroundColor: COLORS.periwinkleGray,
    height: rem(60),
    marginHorizontal: rem(15),
  },
});
