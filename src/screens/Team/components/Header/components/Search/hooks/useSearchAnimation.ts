// SPDX-License-Identifier: ice License 1.0

import {useEffect} from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useSearchAnimation = ({
  isActive,
  cancelWidth,
}: {
  isActive: boolean;
  cancelWidth: number;
}) => {
  const searchShared = useSharedValue(0);

  useEffect(() => {
    searchShared.value = withTiming(isActive ? 1 : 0);
  }, [isActive, searchShared]);

  const animatedContainerStyle = useAnimatedStyle(
    () => ({
      marginRight: interpolate(searchShared.value, [0, 1], [0, cancelWidth]),
    }),
    [cancelWidth],
  );

  const animatedCancelStyle = useAnimatedStyle(() => ({
    opacity: searchShared.value,
  }));

  return {animatedContainerStyle, animatedCancelStyle};
};
