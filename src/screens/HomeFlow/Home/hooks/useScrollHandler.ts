// SPDX-License-Identifier: ice License 1.0

import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export const useScrollHandler = () => {
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
  });

  return {translateY, scrollHandler};
};
