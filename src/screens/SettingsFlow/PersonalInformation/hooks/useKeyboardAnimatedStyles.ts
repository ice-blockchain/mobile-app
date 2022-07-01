// SPDX-License-Identifier: BUSL-1.1

import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {useEffect} from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

const CONTENT_MARGIN_TOP = rem(80);

export const useKeyboardAnimatedStyles = () => {
  const isKeyboardShown = useIsKeyboardShown();
  const keyboardShownShared = useSharedValue(0);

  const animatedCardStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(
      keyboardShownShared.value,
      [0, 1],
      [CONTENT_MARGIN_TOP, 0],
    ),
  }));
  const animatedBodyStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(
      keyboardShownShared.value,
      [0, 1],
      [CONTENT_MARGIN_TOP, 0],
    ),
  }));
  const animatedAvatarStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      keyboardShownShared.value,
      [0, 0.5],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  useEffect(() => {
    keyboardShownShared.value = withTiming(isKeyboardShown ? 1 : 0);
  }, [isKeyboardShown, keyboardShownShared]);

  return {animatedCardStyle, animatedBodyStyle, animatedAvatarStyle};
};
