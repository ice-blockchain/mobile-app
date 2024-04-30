// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {totalActiveUsersSelector} from '@store/modules/Stats/selectors';
import {totalCoinsSelector} from '@store/modules/Tokenomics/selectors';
import {CoinsStackSmallIcon} from '@svg/CoinsStackSmallIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Summary = memo(() => {
  const totalActiveUsers = useSelector(totalActiveUsersSelector);
  const totalCoins = useSelector(totalCoinsSelector);
  return (
    <View style={styles.container}>
      <View style={styles.cell}>
        <LogoIcon color={COLORS.white} width={rem(32)} height={rem(32)} />
        <View style={styles.cellData}>
          <Text style={styles.labelText}>{t('stats.active')}</Text>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              {formatNumber(totalActiveUsers)}
            </Text>
            <View style={styles.onlineIndicator} />
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={[styles.cell, styles.cellRight]}>
        <CoinsStackSmallIcon />
        <View style={styles.cellData}>
          <Text style={styles.labelText}>{t('stats.total_coins')}</Text>
          <Text style={styles.valueText}>
            {formatNumber(totalCoins, {
              notation: 'compact',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
    </View>
  );
});

const ONLINE_INDICATOR_SIZE = rem(6);

const styles = StyleSheet.create({
  container: {
    marginTop: rem(4),
    marginBottom: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    paddingHorizontal: rem(24),
  },
  cellRight: {
    justifyContent: 'flex-end',
    paddingEnd: rem(26),
  },
  cellData: {
    marginStart: rem(8),
    flexShrink: 1,
  },
  separator: {
    width: 1,
    height: rem(21.5),
    backgroundColor: COLORS.white,
  },
  labelText: {
    ...font(12, 14.4),
    opacity: 0.7,
  },
  value: {
    marginTop: rem(1),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  valueText: {
    ...font(15, 18, 'black'),
    alignItems: 'flex-end',
  },
  onlineIndicator: {
    marginLeft: rem(2),
    backgroundColor: COLORS.shamrock,
    width: ONLINE_INDICATOR_SIZE,
    height: ONLINE_INDICATOR_SIZE,
    borderRadius: ONLINE_INDICATOR_SIZE / 2,
  },
});
