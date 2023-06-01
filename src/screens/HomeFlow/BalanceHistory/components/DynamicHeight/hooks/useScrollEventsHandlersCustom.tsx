// SPDX-License-Identifier: ice License 1.0

import {
  ScrollEventsHandlersHookType,
  useScrollEventsHandlersDefault,
} from '@gorhom/bottom-sheet';
import {
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

export const useScrollEventsHandlersCustom: () => {
  useDefaultHook: ScrollEventsHandlersHookType;
  scrollY: SharedValue<number>;
} = () => {
  const scrollY = useSharedValue(0);

  return {
    useDefaultHook: (scrollableRef, scrollableContentOffsetY) => {
      useAnimatedReaction(
        () => scrollableContentOffsetY.value,
        result => {
          scrollY.value = result;
        },
        [],
      );

      return useScrollEventsHandlersDefault(
        scrollableRef,
        scrollableContentOffsetY,
      );
    },
    scrollY,
  };
};
