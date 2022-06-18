// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Platform} from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Params = {
  scrollOffset?: number;
};

export const useScrollShadow = ({scrollOffset = rem(50)}: Params = {}) => {
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });
  const shadowOpacity = useDerivedValue(() =>
    Platform.OS === 'ios'
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
    Platform.OS === 'ios'
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
