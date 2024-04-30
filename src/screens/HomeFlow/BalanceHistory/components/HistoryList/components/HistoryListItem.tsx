// SPDX-License-Identifier: ice License 1.0

import {BalanceDiff} from '@api/tokenomics/types';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {FORCE_LTR_TEXT_CHAR} from '@constants/rtl';
import {commonStyles} from '@constants/styles';
import {dayjs} from '@services/dayjs';
import {ClockIcon} from '@svg/ClockIcon';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {FireIcon} from '@svg/FireIcon';
import {isRTL} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
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
        {!isRTL ? (
          <Text style={styles.adsDiffValueText}>
            {balanceDiff.negative ? '-' : '+'}
          </Text>
        ) : null}
        <FormattedNumber
          number={formatNumberString(balanceDiff.amount)}
          bodyStyle={styles.adsDiffValueText}
          decimalsStyle={styles.adsDiffDecimalsText}
          trim
        />
        {isRTL ? (
          <Text style={styles.adsDiffValueText}>
            {balanceDiff.negative ? '-' : '+'}
          </Text>
        ) : null}
        {isRTL ? <Text style={styles.adsDiffValueText}> </Text> : null}
        <IceLabel
          color={COLORS.primaryDark}
          iconSize={rem(14)}
          textStyle={styles.iceLabelText}
          iconOffsetY={0}
        />
      </View>
      <Text style={styles.relDiffText}>
        {`${FORCE_LTR_TEXT_CHAR}${balanceDiff.bonus > 0 ? '+' : ''}${
          balanceDiff.bonus
        }%`}
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
    ...font(17, 22, 'black', 'primaryDark'),
  },
  adsDiffDecimalsText: {
    ...font(10, 12, 'bold', 'primaryDark'),
    marginRight: isRTL ? 0 : rem(4),
  },
  iceLabelText: {
    ...font(17, 22, 'semibold', 'primaryDark'),
    marginLeft: isRTL ? rem(4) : 0,
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
