// SPDX-License-Identifier: ice License 1.0

import {useCallback, useState} from 'react';
import {LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

const EXPANDED_TITLE_FONT_SIZE = rem(28);
const COLLAPSED_TITLE_FONT_SIZE = rem(15);

export function useLayoutAnimation({
  animatedIndex,
  deltaPositions,
}: {
  animatedIndex: SharedValue<number>;
  deltaPositions: number;
}) {
  const titleMinHeight = useSharedValue(Number.MAX_SAFE_INTEGER);

  const onTitleLayout = useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }: LayoutChangeEvent) => {
      titleMinHeight.value = Math.min(height, titleMinHeight.value);
    },
    [titleMinHeight],
  );

  const [buttonLayout, setButtonLayout] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onButtonLayout = useCallback(
    ({nativeEvent: {layout}}: LayoutChangeEvent) => {
      setButtonLayout(layout);
    },
    [],
  );

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, -deltaPositions],
            {
              extrapolateLeft: Extrapolation.CLAMP,
              extrapolateRight: Extrapolation.CLAMP,
            },
          ),
        },
      ],
    };
  }, [deltaPositions]);

  const valuesContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedIndex.value, [0, 0.5], [1, 0], {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }),
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    return {
      marginRight: interpolate(
        animatedIndex.value,
        [0, 0.3, 1],
        [0, buttonLayout.width, buttonLayout.width + 12],
        {
          extrapolateLeft: Extrapolation.CLAMP,
          extrapolateRight: Extrapolation.CLAMP,
        },
      ),
      fontSize: interpolate(
        animatedIndex.value,
        [0, 0.3, 1],
        [
          EXPANDED_TITLE_FONT_SIZE,
          COLLAPSED_TITLE_FONT_SIZE,
          COLLAPSED_TITLE_FONT_SIZE,
        ],
        {
          extrapolateLeft: Extrapolation.CLAMP,
          extrapolateRight: Extrapolation.CLAMP,
        },
      ),
      transform: [
        {
          translateY: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, (titleMinHeight.value + buttonLayout.height) / 2 + 8],
            {
              extrapolateLeft: Extrapolation.CLAMP,
              extrapolateRight: Extrapolation.CLAMP,
            },
          ),
        },
      ],
    };
  });

  return {
    contentStyle,
    titleStyle,
    valuesContainerStyle,
    onTitleLayout,
    onButtonLayout,
  };
}
