// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import {useEffect, useState} from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAnimateOptions = ({options}: {options: string[]}) => {
  const animation = useSharedValue(0);
  const [visibleOptions, setVisibleOptions] = useState<string[]>(options);

  useEffect(() => {
    if (visibleOptions.length && options.length && visibleOptions !== options) {
      const updateOptions = () => {
        setVisibleOptions(options);
      };
      animation.value = withTiming(
        1,
        {
          duration: 300,
          easing: Easing.linear,
        },
        () => {
          runOnJS(updateOptions)();
          animation.value = 0;
        },
      );
    }
  }, [visibleOptions, animation, options]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animation.value * -windowWidth}],
    };
  });

  return {animatedStyle};
};
