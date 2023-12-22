// SPDX-License-Identifier: ice License 1.0

import {
  ScrollEventHandlerCallbackType,
  ScrollEventsHandlersHookType,
  useScrollEventsHandlersDefault,
} from '@components/BottomSheet';
import {ScrollEventContextType} from '@gorhom/bottom-sheet/lib/typescript/hooks/useScrollEventsHandlersDefault';
import {
  SharedValue,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';

export const useScrollEventsHandlersCustom: () => {
  useDefaultHook: ScrollEventsHandlersHookType;
  scrollY: SharedValue<number>;
} = () => {
  const scrollY = useSharedValue(0);

  return {
    useDefaultHook: (scrollableRef, scrollableContentOffsetY) => {
      const {handleOnScroll, ...rest} = useScrollEventsHandlersDefault(
        scrollableRef,
        scrollableContentOffsetY,
      );

      const handleOnScrollCustom: ScrollEventHandlerCallbackType<ScrollEventContextType> =
        useWorkletCallback(
          (event, ctx) => {
            scrollY.value = event.contentOffset.y;
            handleOnScroll?.(event, ctx);
          },
          [handleOnScroll, scrollY],
        );

      return {
        ...rest,
        handleOnScroll: handleOnScrollCustom,
      };
    },
    scrollY,
  };
};
