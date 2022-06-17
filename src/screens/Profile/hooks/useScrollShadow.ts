// SPDX-License-Identifier: BUSL-1.1

import {Platform} from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  scrollOffset: number;
};

export const useScrollShadow = ({scrollOffset}: Props) => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const shadowOpacity = useDerivedValue(() =>
    Platform.OS === 'ios'
      ? interpolate(
          scrollY.value,
          [0, scrollOffset],
          [0, 0.2],
          Extrapolate.CLAMP,
        )
      : interpolate(
          scrollY.value,
          [0, scrollOffset],
          [0, 3],
          Extrapolate.CLAMP,
        ),
  );
  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: shadowOpacity.value,
    elevation: shadowOpacity.value,
  }));

  return {scrollY, scrollHandler, animatedStyle};
};
