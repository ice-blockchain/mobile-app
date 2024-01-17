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

export const useTransitionAnimation = ({
  options,
  question,
}: {
  options: string[];
  question: string;
}) => {
  const animation = useSharedValue(0);
  const [visibleOptions, setVisibleOptions] = useState<string[]>(options);
  const [visibleQuestion, setVisibleQuestion] = useState<string>(question);

  useEffect(() => {
    if (visibleOptions.length && options.length && visibleOptions !== options) {
      const updateVisibility = () => {
        setVisibleOptions(options);
        setVisibleQuestion(question);
      };
      animation.value = withTiming(
        1,
        {
          duration: 300,
          easing: Easing.linear,
        },
        () => {
          runOnJS(updateVisibility)();
        },
      );
    }
  }, [visibleOptions, animation, options, question]);

  useEffect(() => {
    if (visibleOptions === options) {
      animation.value = 0;
    }
  }, [animation, options, visibleOptions]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animation.value * -windowWidth}],
    };
  });

  return {animatedStyle, visibleOptions, visibleQuestion};
};
