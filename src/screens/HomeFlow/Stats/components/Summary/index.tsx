// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {
  totalActiveUsersSelector,
  totalUsersSelector,
} from '@store/modules/Stats/selectors';
import {LogoIcon} from '@svg/LogoIcon';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Summary = memo(() => {
  const totalActiveUsers = useSelector(totalActiveUsersSelector);
  const totalUsers = useSelector(totalUsersSelector);
  return (
    <View style={styles.container}>
      <View style={[styles.cell, styles.cell_left]}>
        <LogoIcon color={COLORS.white} width={rem(32)} height={rem(32)} />
        <View style={styles.cellDataLeft}>
          <Text style={styles.labelText}>{t('stats.online_miners')}</Text>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              {formatNumber(totalActiveUsers)}
            </Text>
            <Text style={styles.onlineIndicator}>●</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={[styles.cell, styles.cell_right]}>
        <TeamInactiveIcon
          width={rem(40)}
          height={rem(40)}
          color={COLORS.white}
          style={styles.teamIcon}
        />
        <View style={styles.cellDataRight}>
          <Text style={styles.labelText}>{t('stats.total')}</Text>
          <Text style={styles.valueText}>{formatNumber(totalUsers)}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: rem(4),
    height: rem(56),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexShrink: 0,
  },
  cell_left: {
    paddingLeft: rem(24),
  },
  cell_right: {
    paddingRight: rem(32),
    justifyContent: 'flex-end',
  },
  cellDataLeft: {
    marginLeft: rem(12),
  },
  cellDataRight: {
    marginLeft: rem(8),
    alignItems: 'flex-end',
  },
  separator: {
    width: 1,
    marginTop: rem(4),
    height: rem(21.5),
    backgroundColor: COLORS.white,
  },
  labelText: {
    ...font(12, 15, 'medium'),
    opacity: 0.7,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  valueText: {
    ...font(15, 18, 'black'),
    alignItems: 'flex-end',
  },
  onlineIndicator: {
    ...font(15, null, 'black', 'shamrock'),
    marginTop: -rem(7),
    marginLeft: rem(2),
  },
  teamIcon: {
    marginTop: -rem(5),
  },
});
