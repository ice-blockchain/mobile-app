// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React, {useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
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

const CONTAINER_WIDTH = rem(18);
const CONTAINER_HEIGHT = rem(12);
const CONTAINER_BORDER_RADIUS = rem(7);
const CONTAINER_BORDER_WIDTH = 1;
const BALL_SIZE = rem(8);
const BALL_SIDE_OFFSET = 1;

export const Switch = ({value, onValueChange, style}: SwitchProps) => {
  const stateSharedValue = useSharedValue(value ? 1 : 0);

  const animatedBallStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            stateSharedValue.value,
            [0, 1],
            [
              BALL_SIDE_OFFSET,
              CONTAINER_WIDTH -
                BALL_SIZE -
                BALL_SIDE_OFFSET -
                CONTAINER_BORDER_WIDTH * 2,
            ],
          ),
        },
      ],
      backgroundColor: interpolateColor(
        stateSharedValue.value,
        [0, 1],
        [COLORS.darkBlue, COLORS.white],
      ),
    };
  });

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        stateSharedValue.value,
        [0, 1],
        [COLORS.white, COLORS.darkBlue],
      ),
    };
  });

  useEffect(() => {
    stateSharedValue.value = withTiming(value ? 1 : 0);
  }, [stateSharedValue, value]);

  return (
    <TouchableWithoutFeedback
      onPress={() => onValueChange(!value)}
      hitSlop={SWITCH_HIT_SLOP}>
      <Animated.View style={[styles.container, animatedContainerStyles, style]}>
        <Animated.View style={[styles.ball, animatedBallStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    borderWidth: CONTAINER_BORDER_WIDTH,
    borderColor: COLORS.darkBlue,
    borderRadius: CONTAINER_BORDER_RADIUS,
    justifyContent: 'center',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
  },
});

const SWITCH_HIT_SLOP = {top: 15, right: 15, bottom: 15, left: 15};
