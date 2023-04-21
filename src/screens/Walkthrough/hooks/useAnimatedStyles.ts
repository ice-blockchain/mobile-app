// SPDX-License-Identifier: ice License 1.0

import {
  ANIMATION_CONFIG,
  ANIMATION_DELAY,
} from '@screens/Walkthrough/constants';
import {WalkthroughStep} from '@store/modules/Walkthrough/types';
import {useCallback, useEffect} from 'react';
import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export const useAnimatedStyles = ({
  step,
  elementHeight,
}: {
  step: WalkthroughStep | undefined;
  elementHeight: number | undefined;
}) => {
  const opacity = useSharedValue(0);

  const elementAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const circleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    return () => {
      cancelAnimation(opacity);
    };
  }, [opacity]);

  useEffect(() => {
    if (elementHeight) {
      cancelAnimation(opacity);
      opacity.value = withDelay(
        ANIMATION_DELAY,
        withTiming(1, ANIMATION_CONFIG),
      );
    }
  }, [elementHeight, opacity, step]);

  const runCloseAnimation = useCallback(
    (cb: () => void) => {
      cancelAnimation(opacity);
      opacity.value = withTiming(0, ANIMATION_CONFIG, () => {
        runOnJS(cb)();
      });
    },
    [opacity],
  );

  return {elementAnimatedStyle, circleAnimatedStyle, runCloseAnimation};
};
