// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  valuePercentage: number;
  label?: string;
  active?: boolean;
  showLabel?: boolean;
  isUnited?: boolean;
  bgColor?: string;
};

export const VerticalBar = ({
  valuePercentage,
  label,
  active = true,
  showLabel = true,
  isUnited = false,
  bgColor = COLORS.shamrock,
}: Props) => {
  const play = useSharedValue(false);
  const progress = useDerivedValue(() => {
    return play.value ? withTiming(valuePercentage, {duration: 600}) : 0;
  });
  const animatedStyle = useAnimatedStyle(() => ({
    height: `${progress.value}%`,
  }));
  const backgroundColor = useMemo(() => {
    return {
      current: {
        backgroundColor: bgColor,
      },
    };
  }, [bgColor]);

  useEffect(() => {
    if (active) {
      play.value = true;
    }
  }, [active, play]);

  return (
    <View style={isUnited ? styles.containerUnited : styles.container}>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.bar,
          backgroundColor.current,
          animatedStyle,
          isUnited ? styles.barStyleUnited : styles.barStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerUnited: {
    flex: 0,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  bar: {
    borderRadius: rem(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: rem(5),
  },
  barStyleUnited: {
    width: rem(10),
    marginRight: rem(4),
  },
  barStyle: {
    width: rem(16),
  },
  label: {
    ...font(8, 9.6, 'medium', 'white', 'center'),
  },
});
