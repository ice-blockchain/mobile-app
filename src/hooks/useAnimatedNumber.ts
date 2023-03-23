// SPDX-License-Identifier: ice License 1.0

import debounce from 'lodash/debounce';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedNumber(
  value: number,
  formatter: (value: number) => string = initialValue => `${initialValue}`,
) {
  const sharedValue = useSharedValue<number>(0);

  const [animatedValue, setAnimatedValue] = useState('0');

  const setAnimatedValueDebounced = useMemo(() => {
    return debounce(setAnimatedValue, 50, {
      maxWait: 50,
    });
  }, []);

  const updateValue = useCallback(
    (newValue: number) => {
      const newFormattedValue = formatter(newValue);
      if (newFormattedValue !== animatedValue) {
        setAnimatedValueDebounced(newFormattedValue);
      }
    },
    [animatedValue, formatter, setAnimatedValueDebounced],
  );

  useDerivedValue(() => {
    runOnJS(updateValue)(sharedValue.value);
  });

  useEffect(() => {
    sharedValue.value = withTiming(value, {
      duration: 1500,
      easing: Easing.in(Easing.quad),
    });
  }, [sharedValue, value]);

  return animatedValue;
}
