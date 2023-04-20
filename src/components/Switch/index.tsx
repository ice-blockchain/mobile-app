// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {isRTL} from '@translations/i18n';
import React, {useEffect} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

export type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

const CONTAINER_WIDTH = rem(51);
const CONTAINER_HEIGHT = rem(31);
const CONTAINER_BORDER_RADIUS = rem(16);
const CONTAINER_BORDER_WIDTH = 1;
const BALL_SIZE = rem(27);
const BALL_SIDE_OFFSET = 1;

export const Switch = ({value, onValueChange, style}: SwitchProps) => {
  const stateSharedValue = useSharedValue(value ? 1 : 0);

  const animatedBallStyles = useAnimatedStyle(() => {
    const output = isRTL
      ? [-BALL_SIZE + 5, 0]
      : [
          BALL_SIDE_OFFSET,
          CONTAINER_WIDTH -
            BALL_SIZE -
            BALL_SIDE_OFFSET -
            CONTAINER_BORDER_WIDTH * 2,
        ];
    return {
      transform: [
        {
          translateX: interpolate(stateSharedValue.value, [0, 1], output),
        },
      ],
    };
  });

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        stateSharedValue.value,
        [0, 1],
        [COLORS.periwinkleGray, COLORS.shamrock],
      ),
    };
  });

  useEffect(() => {
    stateSharedValue.value = withTiming(value ? 1 : 0);
  }, [stateSharedValue, value]);

  return (
    <Touchable onPress={() => onValueChange(!value)} hitSlop={SWITCH_HIT_SLOP}>
      <Animated.View style={[styles.container, animatedContainerStyles, style]}>
        <Animated.View style={[styles.ball, animatedBallStyles]} />
      </Animated.View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    borderWidth: CONTAINER_BORDER_WIDTH,
    borderColor: COLORS.periwinkleGray,
    borderRadius: CONTAINER_BORDER_RADIUS,
    justifyContent: 'center',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowOpacity: 0.15,
  },
});

const SWITCH_HIT_SLOP = {top: 15, right: 15, bottom: 15, left: 15};
