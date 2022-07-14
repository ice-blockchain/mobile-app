// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {isIOS, rem} from 'rn-units';

type Params = {
  scrollOffset?: number;
};

export const useScrollShadow = ({scrollOffset = rem(50)}: Params = {}) => {
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });
  const shadowOpacity = useDerivedValue(() =>
    isIOS
      ? interpolate(
          translationY.value,
          [0, scrollOffset],
          [0, 0.2],
          Extrapolate.CLAMP,
        )
      : interpolate(
          translationY.value,
          [0, scrollOffset],
          [0, 3],
          Extrapolate.CLAMP,
        ),
  );
  const shadowStyle = useAnimatedStyle(() =>
    isIOS
      ? {
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 4,
          shadowOpacity: shadowOpacity.value,
        }
      : {elevation: shadowOpacity.value},
  );

  return {translationY, scrollHandler, shadowStyle};
};
