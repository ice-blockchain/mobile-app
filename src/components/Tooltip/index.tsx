// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Animated, {
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  ZoomInEasyDown,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  animated: boolean;
  children: ReactNode;
  style: StyleProp<ViewStyle>;
  chevronStyle: StyleProp<ViewStyle>;
};

export const Tooltip = ({animated, children, style, chevronStyle}: Props) => {
  const bounceProgress = useSharedValue(0);
  const bounceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(bounceProgress.value, [0, 0.5, 1], [0, -10, 0]),
      },
    ],
  }));

  const onEnteringAnimationEnds = () => {
    'worklet';
    bounceProgress.value = withRepeat(
      withDelay(1000, withTiming(1, {duration: 400})),
      -1,
    );
  };

  const TooltipView = (animated ? Animated.View : View) as React.ElementType;

  return (
    <TooltipView
      style={[style, animated ? bounceAnimatedStyle : {}]}
      entering={ZoomInEasyDown.delay(1000)
        .duration(600)
        .withCallback(onEnteringAnimationEnds)}
      exiting={FadeOut}>
      {children}
      <RoundedTriangle
        fill={COLORS.downriver}
        style={chevronStyle}
        width={rem(16)}
      />
    </TooltipView>
  );
};
