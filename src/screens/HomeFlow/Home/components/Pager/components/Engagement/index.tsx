// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {miningSummarySelector} from '@store/modules/Tokenomics/selectors';
import {MiningHammerIcon} from '@svg/MiningHammerIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  darkMode?: boolean;
};

export const Engagement = memo(({darkMode}: Props) => {
  const miningSummary = useSelector(miningSummarySelector);
  const color = darkMode ? COLORS.primaryDark : COLORS.white;

  const animatedMiningSummaryMiningStreak = useAnimatedNumber(
    miningSummary?.miningStreak ?? 0,
    initialValue =>
      formatNumber(initialValue, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
  );

  const animatedMiningSummaryRemainingFreeMiningSessions = useAnimatedNumber(
    miningSummary?.remainingFreeMiningSessions ?? 0,
    initialValue =>
      formatNumber(initialValue, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
  );

  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <View style={styles.titleContainer}>
        <MiningHammerIcon color={color} />
        <Text
          style={[styles.engagementText, darkMode && commonStyles.darkText]}>
          {t('home.engagement.title')}
        </Text>
      </View>
      <View style={styles.valuesContainer}>
        <View style={styles.titleValueContainer}>
          <Text style={[styles.title, darkMode && commonStyles.darkText]}>
            {t('home.engagement.streak')}
          </Text>
          <Text style={[styles.value, darkMode && commonStyles.darkText]}>
            {animatedMiningSummaryMiningStreak}
          </Text>
        </View>
        <View style={[styles.titleValueContainer, styles.daysOff]}>
          <Text style={[styles.title, darkMode && commonStyles.darkText]}>
            {t('home.engagement.days_off')}
          </Text>
          <Text style={[styles.value, darkMode && commonStyles.darkText]}>
            {animatedMiningSummaryRemainingFreeMiningSessions}
          </Text>
        </View>
      </View>
      <Text
        style={[styles.description, darkMode && commonStyles.darkText]}
        numberOfLines={2}
        adjustsFontSizeToFit>
        {t('home.engagement.description')}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    height: PAGE_HEIGHT + rem(30),
    marginBottom: -rem(30),
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  engagementText: {
    marginTop: rem(30),
    ...font(12, 14, 'semibold'),
    marginLeft: rem(4),
  },
  engagement: {
    marginTop: rem(4),
    borderRadius: rem(16),
    paddingHorizontal: rem(20),
    paddingVertical: rem(6),
    backgroundColor: COLORS.toreaBay,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginTop: rem(9),
    marginHorizontal: rem(20),
    ...font(11, 13, 'regular'),
    textAlign: 'center',
  },
  valuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(12),
  },
  titleValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...font(12, 14, 'semibold'),
  },
  value: {
    ...font(26, 31, 'semibold'),
    marginTop: rem(4),
  },
  daysOff: {
    marginLeft: rem(74),
  },
});
