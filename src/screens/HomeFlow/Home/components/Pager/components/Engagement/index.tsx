// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {AnimatedNumberText} from '@hooks/AnimatedNumber';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {PageSkeleton} from '@screens/HomeFlow/Home/components/Pager/components/PageSkeleton';
import {miningSummarySelector} from '@store/modules/Tokenomics/selectors';
import {MiningHammerIcon} from '@svg/MiningHammerIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TextProps, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  darkMode?: boolean;
};

export const Engagement = memo(({darkMode}: Props) => {
  const miningSummary = useSelector(miningSummarySelector);
  const color = darkMode ? COLORS.primaryDark : COLORS.white;

  const AnimatedMiningStreak = useCallback(
    ({style}: TextProps) => (
      <AnimatedNumberText
        textDecorator={animatedValue =>
          formatNumber(animatedValue, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })
        }
        style={style}
        value={miningSummary?.miningStreak ?? 0}
      />
    ),
    [miningSummary?.miningStreak],
  );

  const AnimatedFreeMiningSessions = useCallback(
    ({style}: TextProps) => (
      <AnimatedNumberText
        textDecorator={animatedValue =>
          formatNumber(animatedValue, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })
        }
        style={style}
        value={miningSummary?.remainingFreeMiningSessions ?? 0}
      />
    ),
    [miningSummary?.remainingFreeMiningSessions],
  );

  if (!miningSummary) {
    return <PageSkeleton />;
  }

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
            <AnimatedMiningStreak />
          </Text>
        </View>
        <View style={[styles.titleValueContainer, styles.daysOff]}>
          <Text style={[styles.title, darkMode && commonStyles.darkText]}>
            {t('home.engagement.days_off')}
          </Text>
          <Text style={[styles.value, darkMode && commonStyles.darkText]}>
            <AnimatedFreeMiningSessions />
          </Text>
        </View>
      </View>
      <Text
        style={[styles.description, darkMode && commonStyles.darkText]}
        numberOfLines={2}
        adjustsFontSizeToFit>
        {`${t('home.engagement.description_part1')}\n${t(
          'home.engagement.description_part2',
        )}`}
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
    ...font(11, 13, 'regular', 'white', 'center'),
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
