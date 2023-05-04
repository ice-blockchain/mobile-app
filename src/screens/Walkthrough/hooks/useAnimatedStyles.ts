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
  const elementOpacity = useSharedValue(0);
  const circleOpacity = useSharedValue(0);

  const elementAnimatedStyle = useAnimatedStyle(() => ({
    opacity: elementOpacity.value,
  }));
  const circleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
  }));

  useEffect(() => {
    return () => {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
    };
  }, [circleOpacity, elementOpacity]);

  useEffect(() => {
    if (elementHeight) {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
      elementOpacity.value = withTiming(1, ANIMATION_CONFIG, () => {
        circleOpacity.value = withDelay(
          ANIMATION_DELAY,
          withTiming(1, ANIMATION_CONFIG),
        );
      });
    }
  }, [circleOpacity, elementHeight, elementOpacity, step]);

  const runCloseAnimation = useCallback(
    (cb: () => void) => {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
      circleOpacity.value = withTiming(0, ANIMATION_CONFIG);
      elementOpacity.value = withTiming(0, ANIMATION_CONFIG, () => {
        runOnJS(cb)();
      });
    },
    [elementOpacity, circleOpacity],
  );

  return {elementAnimatedStyle, circleAnimatedStyle, runCloseAnimation};
};
