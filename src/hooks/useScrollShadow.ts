// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {isIOS, rem} from 'rn-units';

type Params = {
  scrollOffset?: number;
  translateY?: SharedValue<number>;
};

export const useScrollShadow = ({
  scrollOffset = rem(50),
  translateY: externalTranslateY,
}: Params = {}) => {
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
  });
  const y = externalTranslateY ?? translateY;
  const animatedShadowStyle = useAnimatedStyle(() => {
    return isIOS
      ? {
          shadowOpacity: interpolate(
            y.value,
            [0, scrollOffset],
            [0, commonStyles.shadow.shadowOpacity ?? 0],
            Extrapolate.CLAMP,
          ),
        }
      : {
          elevation: interpolate(
            y.value,
            [0, scrollOffset],
            [0, commonStyles.shadow.elevation ?? 0],
            Extrapolate.CLAMP,
          ),
        };
  });

  return {
    translateY,
    scrollHandler,
    shadowStyle: [commonStyles.shadow, animatedShadowStyle],
  };
};
