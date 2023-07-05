// SPDX-License-Identifier: ice License 1.0

import {useCallback, useEffect} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useLabelAnimation = (isFocused: boolean, text?: string) => {
  const focusAnimation = useSharedValue(text ? 1 : 0);

  const bodyHeight = useSharedValue(0);

  const labelHeight = useSharedValue(0);

  const onLayoutBody = useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }: LayoutChangeEvent) => {
      bodyHeight.value = height;
    },
    [bodyHeight],
  );

  const onLayoutLabel = useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }: LayoutChangeEvent) => {
      labelHeight.value = height;
    },
    [labelHeight],
  );

  useEffect(() => {
    focusAnimation.value = withTiming(isFocused || text ? 1 : 0);
  }, [focusAnimation, isFocused, text]);

  const animatedStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(focusAnimation.value, [0, 1], [16, 12]),
    transform: [
      {
        translateY: interpolate(
          focusAnimation.value,
          [0, 1],
          [(bodyHeight.value - labelHeight.value) / 2, -6],
        ),
      },
    ],
  }));

  return {
    animatedStyle,
    onLayoutBody,
    onLayoutLabel,
  };
};
