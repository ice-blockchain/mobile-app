// SPDX-License-Identifier: ice License 1.0

import {useState} from 'react';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Params = {
  translateY: SharedValue<number>;
  transitionOffset: number;
};

const TRANSITION_WINDOW = rem(20);

export const useTransitionAnimation = ({
  translateY,
  transitionOffset,
}: Params) => {
  const [currentAnimationState, setCurrentAnimationState] = useState<
    'from' | 'to'
  >('from');

  const fromAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [transitionOffset - TRANSITION_WINDOW, transitionOffset],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const toAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [transitionOffset, transitionOffset + TRANSITION_WINDOW],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  useDerivedValue(() => {
    const fromOpacityValue = interpolate(
      translateY.value,
      [transitionOffset - TRANSITION_WINDOW, transitionOffset],
      [1, 0],
      Extrapolate.CLAMP,
    );

    const newCurrentAnimationState = fromOpacityValue > 0 ? 'from' : 'to';

    if (currentAnimationState !== newCurrentAnimationState) {
      runOnJS(setCurrentAnimationState)(newCurrentAnimationState);
    }
  }, [currentAnimationState]);

  return {currentAnimationState, fromAnimatedStyle, toAnimatedStyle};
};
