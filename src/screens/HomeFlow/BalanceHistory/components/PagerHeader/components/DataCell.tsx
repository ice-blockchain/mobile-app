// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {InfoButton} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/InfoButton';
import {Coordinates} from '@screens/Modals/types';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
  currency?: string | ReactNode;
  onInfoIconPressed?: (coordinates: Coordinates) => void;
};

export const DataCell = ({
  icon,
  label,
  value,
  currency,
  onInfoIconPressed,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.labelText}>
        {label}
        <InfoButton onInfoIconPressed={onInfoIconPressed} />
      </Text>
      <View style={styles.value}>
        {typeof value === 'string' ? (
          <Text style={styles.valueText}>{value}</Text>
        ) : (
          value
        )}
        {!isRTL && !!currency && (
          <Text style={styles.valueText}> {currency}</Text>
        )}
        {isRTL && !!currency && (
          <Text style={styles.valueText}>{currency} </Text>
        )}
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
    ...font(12, 16, 'medium', 'white', 'center'),
    textTransform: 'uppercase',
  },
  value: {
    marginTop: rem(4),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  valueText: {
    ...font(15, 17, 'bold'),
    textAlignVertical: 'center',
  },
  cellSeparator: {
    width: 1,
    backgroundColor: COLORS.periwinkleGray,
    marginTop: rem(14),
    height: rem(40),
  },
});
