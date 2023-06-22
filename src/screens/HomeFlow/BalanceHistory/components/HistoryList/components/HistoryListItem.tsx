// SPDX-License-Identifier: ice License 1.0

import {BalanceDiff} from '@api/tokenomics/types';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {dayjs} from '@services/dayjs';
import {ClockIcon} from '@svg/ClockIcon';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {FireIcon} from '@svg/FireIcon';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  balanceDiff: BalanceDiff;
  time: string;
};

export const HistoryListItem = ({balanceDiff, time}: Props) => {
  return (
    <View
      style={[
        styles.container,
        styles.containerBackground,
        commonStyles.shadow,
      ]}>
      <View
        style={[
          styles.icon,
          balanceDiff.negative ? styles.iconNegative : styles.iconPositive,
        ]}>
        {balanceDiff.negative ? (
          <FireIcon color={COLORS.white} width={rem(18)} height={rem(24)} />
        ) : (
          <CoinsStackIcon
            color={COLORS.white}
            width={rem(18)}
            height={rem(18)}
          />
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.adsDiffValueText}>
          {balanceDiff.negative ? '-' : '+'}
        </Text>
        <FormattedNumber
          number={formatNumber(balanceDiff.amount, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          bodyStyle={styles.adsDiffValueText}
          decimalsStyle={styles.adsDiffDecimalsText}
          trim
        />
        <IceLabel
          color={COLORS.primaryDark}
          iconSize={rem(14)}
          textStyle={styles.iceLabelText}
          iconOffsetY={0}
        />
      </View>
      <Text style={styles.relDiffText}>
        {balanceDiff.bonus > 0 && '+'}
        {balanceDiff.bonus}%
      </Text>
      <ClockIcon width={rem(14)} height={rem(14)} color={COLORS.primaryDark} />
      <Text style={styles.timeText}>{dayjs(time).format('LT')}</Text>
    </View>
  );
};

export const HistoryListItemSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: rem(60),
    marginVertical: rem(7),
    marginHorizontal: rem(16),
    paddingHorizontal: rem(12),
    borderRadius: rem(16),
    alignItems: 'center',
  },
  containerBackground: {
    backgroundColor: COLORS.white,
  },
  icon: {
    width: rem(36),
    height: rem(36),
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rem(8),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: rem(8),
  },
  iconPositive: {
    backgroundColor: COLORS.shamrock,
  },
  iconNegative: {
    backgroundColor: COLORS.attention,
  },
  adsDiffValueText: {
    ...font(17, 21, 'black', 'primaryDark'),
  },
  adsDiffDecimalsText: {
    ...font(10, 12, 'bold', 'primaryDark'),
    marginRight: rem(4),
  },
  iceLabelText: {
    ...font(17, 21, 'semibold', 'primaryDark'),
  },
  relDiffText: {
    ...font(14, 20, 'medium', 'primaryLight'),
    marginRight: rem(20),
  },
  timeText: {
    ...font(14, 20, 'medium', 'primaryDark'),
    marginLeft: rem(6),
  },
});
