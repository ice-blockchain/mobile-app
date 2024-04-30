// SPDX-License-Identifier: ice License 1.0

import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Params = {
  scrollOffset?: number;
  translateY?: SharedValue<number>;
};

export const useScrollOpacity = ({
  scrollOffset = rem(100),
  translateY: externalTranslateY,
}: Params = {}) => {
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
  });
  const y = externalTranslateY ?? translateY;
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [0, scrollOffset],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return {
    translateY,
    scrollHandler,
    animatedOpacityStyle,
  };
};
