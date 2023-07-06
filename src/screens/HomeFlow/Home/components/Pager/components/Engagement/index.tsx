// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {PageSkeleton} from '@screens/HomeFlow/Home/components/Pager/components/PageSkeleton';
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
            <AnimatedNumberText
              textDecorator={animatedValue =>
                formatNumber(animatedValue, {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })
              }
              value={miningSummary?.miningStreak ?? 0}
            />
          </Text>
        </View>
        <View style={[styles.titleValueContainer, styles.daysOff]}>
          <Text style={[styles.title, darkMode && commonStyles.darkText]}>
            {t('home.engagement.days_off')}
          </Text>
          <Text style={[styles.value, darkMode && commonStyles.darkText]}>
            <AnimatedNumberText
              textDecorator={animatedValue =>
                formatNumber(animatedValue, {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })
              }
              value={miningSummary?.remainingFreeMiningSessions ?? 0}
            />
          </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          style={[styles.description, darkMode && commonStyles.darkText]}
          numberOfLines={3}>
          {`${t('home.engagement.description_part1')} ${t(
            'home.engagement.description_part2',
          )}`}
        </Text>
      </View>
    </View>
  );
});

const MARGIN = rem(30);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    height: PAGE_HEIGHT + MARGIN,
    marginBottom: -MARGIN,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  engagementText: {
    marginTop: MARGIN,
    ...font(12, 15, 'semibold'),
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
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: rem(20),
    marginBottom: MARGIN + rem(6),
  },
  description: {
    ...font(11, 14, 'regular', 'white', 'center'),
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
    ...font(12, 15, 'semibold'),
  },
  value: {
    ...font(26, 31, 'semibold'),
    marginTop: rem(4),
  },
  daysOff: {
    marginLeft: rem(74),
  },
});
