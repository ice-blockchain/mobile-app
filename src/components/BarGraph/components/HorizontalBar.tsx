// SPDX-License-Identifier: ice License 1.0

import {BarLabel, StatsType} from '@components/BarGraph/components/BarLabel';
import {COLORS} from '@constants/colors';
import {isRTL} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  maxValue: number;
  value: number;
  maxWidth: number;
  sharedValue: SharedValue<number>;
  doAnimate: boolean;
  type: StatsType;
};

export const HorizontalBar = ({
  maxValue,
  maxWidth,
  value,
  sharedValue,
  doAnimate,
  type,
}: Props) => {
  const isLabelOutside = value / maxValue < 0.2;
  const width = useMemo(
    () => maxWidth * (value / maxValue),
    [maxValue, maxWidth, value],
  );
  const animatedStyle = useAnimatedStyle(() => {
    const output = isRTL ? [width, 0] : [-width, 0];
    return {
      transform: [
        {
          translateX: interpolate(sharedValue.value, [-1, 0], output),
        },
      ],
    };
  });
  const backgroundColor = useMemo(() => {
    const valuePercentage = Math.floor((value / maxValue) * 100);
    const red = 100 - Math.round((60 * valuePercentage) / 100);
    const green = 200 - Math.round((90 * valuePercentage) / 100);
    return StyleSheet.create({
      // eslint-disable-next-line react-native/no-unused-styles
      current: {
        backgroundColor: `rgba(${red},${green},255,1)`,
      },
    });
  }, [value, maxValue]);

  if (!value) {
    return null;
  }

  const barLabel = formatBarValue(value, type);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          backgroundColor.current,
          doAnimate && animatedStyle,
          {width},
        ]}>
        {!isLabelOutside && (
          <BarLabel value={barLabel} color={COLORS.white} type={type} />
        )}
      </Animated.View>
      {isLabelOutside && (
        <BarLabel value={barLabel} color={COLORS.primaryLight} type={type} />
      )}
    </View>
  );
};

const formatBarValue = (value: number, type: StatsType): string => {
  switch (type) {
    case 'active_users':
      return formatNumber(value, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
        notation: 'compact',
      });
    case 'total_coins': {
      return formatNumber(value, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        notation: 'compact',
      });
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
    borderRadius: rem(10),
  },
  bar: {
    height: rem(24),
    borderRadius: rem(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
