// SPDX-License-Identifier: ice License 1.0

import {useEffect, useState} from 'react';
import {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useImageZoomAnimation = (
  size: number,
  radius: number,
  viewPortWidth: number,
  viewPortHeight: number,
  coords?: {x: number; y: number},
) => {
  const [zoomAnimationDone, setZoomAnimationDone] = useState(false);
  const animationProgress = useSharedValue(0);
  const animatedZoomStyle = useAnimatedStyle(() => {
    if (coords) {
      return {
        width: interpolate(
          animationProgress.value,
          [0, 1],
          [size, viewPortWidth],
        ),
        height: interpolate(
          animationProgress.value,
          [0, 1],
          [size, viewPortWidth],
        ),
        left: interpolate(animationProgress.value, [0, 1], [coords.x, 0]),
        top: interpolate(
          animationProgress.value,
          [0, 1],
          [coords.y, (viewPortHeight - viewPortWidth) / 2],
        ),
        borderRadius: interpolate(animationProgress.value, [0, 1], [radius, 0]),
      };
    }
    return {};
  }, [coords]);

  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: animationProgress.value,
  }));

  const onAnimationEnd = () => {
    setZoomAnimationDone(true);
  };

  useEffect(() => {
    if (coords) {
      animationProgress.value = withTiming(1, {duration: 300}, () =>
        // https://github.com/software-mansion/react-native-reanimated/issues/1758#issuecomment-1100377809
        runOnJS(onAnimationEnd)(),
      );
    }
  }, [coords, animationProgress]);

  return {
    animationProgress,
    animatedZoomStyle,
    animatedOpacityStyle,
    zoomAnimationDone,
  };
};
