// SPDX-License-Identifier: ice License 1.0

import throttle from 'lodash/throttle';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type AnimationOptions = {
  duration?: number;
};

export function useAnimatedNumber(
  value: number,
  {duration = 1500}: AnimationOptions = {},
) {
  const sharedValue = useSharedValue<number>(0);

  const [animatedValue, setAnimatedValue] = useState(0);

  const setAnimatedValueDebounced = useMemo(() => {
    return throttle(setAnimatedValue, 150);
  }, []);

  const updateValue = useCallback(
    (newValue: number) => {
      if (newValue !== animatedValue) {
        setAnimatedValueDebounced(newValue);
      }
    },
    [animatedValue, setAnimatedValueDebounced],
  );

  useDerivedValue(() => {
    runOnJS(updateValue)(sharedValue.value);
  });

  useEffect(() => {
    sharedValue.value = withTiming(value, {
      duration,
      easing: Easing.in(Easing.quad),
    });
  }, [sharedValue, value, duration]);

  return animatedValue;
}
