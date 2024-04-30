// SPDX-License-Identifier: ice License 1.0

import {AdoptionMilestone} from '@api/statistics/types';
import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {CARD_WIDTH} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {dayjs} from '@services/dayjs';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import {LockIcon} from '@svg/LockIcon';
import {isRTL, t} from '@translations/i18n';
import {formatNumber, formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View, ViewToken} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {isAndroid, rem} from 'rn-units';

export const LEVEL_ROW_HEIGHT = rem(49);
export const DIVIDER_HEIGHT = rem(7);
export const STEP_WIDTH = rem(52);

export const LevelRow = React.memo(
  ({
    item,
    active,
    viewableItems,
    isTopSeparatorVisible,
    isBottomSeparatorVisible,
    onPress,
  }: {
    item: AdoptionMilestone;
    active: boolean;
    viewableItems: Animated.SharedValue<ViewToken[]>;
    isTopSeparatorVisible: boolean;
    isBottomSeparatorVisible: boolean;
    onPress?(): void;
  }) => {
    const achieved = !!item.achievedAt;
    const animationStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value.find(
          viewableItem => viewableItem.item.milestone === item.milestone,
        )?.isViewable,
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0.2),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.9),
          },
        ],
      };
    }, []);

    return (
      <Animated.View style={[styles.row, animationStyle]}>
        <View
          style={[
            styles.progressDivider,
            isTopSeparatorVisible ? styles.divider : {},
            !active ? styles.semitransparent : null,
          ]}
        />
        <Touchable style={styles.rowContent} onPress={onPress}>
          <View style={[styles.flank, !active && styles.semitransparent]}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.valueText}>
                {formatNumberString(item.baseMiningRate, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 6,
                })}
              </Text>
              <View style={styles.leftIconContainer}>
                <IceLabel
                  iconOffsetY={isAndroid ? 3 : 2}
                  textStyle={styles.valueCurrencyText}
                  iconSize={rem(12)}
                  label={t('general.ice_per_hour')}
                />
              </View>
            </View>
            <View style={commonStyles.flexOne} />
          </View>
          <View>
            <View style={[styles.step, !active && styles.semitransparent]}>
              <Text style={styles.stepValueText}>{item.milestone}</Text>
              <Text style={styles.stepLabelText}>
                {t('home.adoption.level')}
              </Text>
            </View>
            {!achieved && (
              <View style={[styles.iconContainer, styles.locked]}>
                <LockIcon height={rem(9)} width={rem(7)} />
              </View>
            )}
            {achieved && !active && (
              <View style={[styles.iconContainer, styles.completed]}>
                <CheckMarkThinIcon width={rem(7)} height={rem(7)} />
              </View>
            )}
          </View>
          <View style={[styles.flank, !active && styles.semitransparent]}>
            <View style={commonStyles.flexOne} />
            <Text style={styles.valueText}>
              {item.achievementDate
                ? dayjs(item.achievementDate).format('D MMM')
                : formatNumber(item.totalActiveUsers ?? 0)}
              <Text style={styles.valueCurrencyText}>
                {'\n'}
                {item.achievementDate
                  ? dayjs(item.achievementDate).format('YYYY')
                  : t('home.adoption.users')}
              </Text>
            </Text>
          </View>
        </Touchable>
        <View
          style={[
            styles.progressDivider,
            isBottomSeparatorVisible ? styles.divider : {},
            !active ? styles.semitransparent : null,
          ]}
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  row: {
    height: LEVEL_ROW_HEIGHT,
    width: CARD_WIDTH,
    paddingHorizontal: rem(24),
  },
  rowContent: {
    flexDirection: 'row',
  },
  progressDivider: {
    width: 1,
    height: DIVIDER_HEIGHT,
    alignSelf: 'center',
  },
  divider: {
    backgroundColor: COLORS.white,
  },
  semitransparent: {
    opacity: 0.5,
  },
  flank: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    minWidth: rem(44),
    ...font(15, 20, 'medium', 'white', 'center'),
  },
  valueCurrencyText: {
    opacity: 0.8,
    ...font(13, 17, 'regular', 'white', 'center'),
    marginLeft: isRTL ? rem(4) : -rem(2),
  },
  step: {
    width: STEP_WIDTH,
    height: LEVEL_ROW_HEIGHT - DIVIDER_HEIGHT,
    backgroundColor: COLORS.white,
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValueText: {
    ...font(15, 20, 'black', 'deepKoamaru'),
  },
  stepLabelText: {
    opacity: 0.8,
    ...font(13, 17, 'regular', 'deepKoamaru'),
  },
  iconContainer: {
    position: 'absolute',
    top: 4,
    right: 3,
    width: rem(14),
    height: rem(14),
    borderRadius: rem(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  locked: {
    backgroundColor: COLORS.spindle,
  },
  completed: {
    backgroundColor: COLORS.completed,
  },
  leftTextContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: rem(36),
  },
  leftIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
