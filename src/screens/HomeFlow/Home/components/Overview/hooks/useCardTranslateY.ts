// SPDX-License-Identifier: ice License 1.0

import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

export const useCardTranslateY = ({
  /**
   * onScroll -> contentOffset.y of the parent ScrollView
   */
  translateY,

  /**
   * offset from the top of the parent ScrollView
   */
  cardsTopOffset,
}: {
  translateY: SharedValue<number>;
  cardsTopOffset: number;
}) => {
  const cardTranslateY = useDerivedValue(() => {
    return interpolate(
      translateY.value,
      [cardsTopOffset, cardsTopOffset + 1],
      [0, 1],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.EXTEND,
      },
    );
  });

  const stickyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: cardTranslateY.value}],
  }));

  return {cardTranslateY, stickyAnimatedStyle};
};
