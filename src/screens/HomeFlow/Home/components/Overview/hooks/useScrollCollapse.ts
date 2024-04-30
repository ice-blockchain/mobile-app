// SPDX-License-Identifier: ice License 1.0

import {useLayoutEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export const useScrollCollapse = ({
  translateY,
  fromHeight,
  toHeight,
}: {
  translateY: SharedValue<number>;
  fromHeight: number;
  toHeight: number;
}) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const containerHeight = useDerivedValue(() => {
    return withTiming(
      interpolate(
        translateY.value,
        [0, fromHeight - toHeight],
        [fromHeight, toHeight],
        {
          extrapolateRight: Extrapolate.CLAMP,
        },
      ),
      {
        /**
         * HACK: issue with ScrollView.onScroll based animation. withTiming is redundant.
         * Looks like problem only with animating height/width.
         * Check https://github.com/software-mansion/react-native-reanimated/issues/1947
         */
        duration: 10,
      },
    );
  });

  useAnimatedReaction(
    () => containerHeight.value <= toHeight,
    (current, previous) => {
      if (current !== previous && previous != null) {
        runOnJS(setCollapsed)(current);
      }
    },
    [isCollapsed, toHeight],
  );

  const sharedIsCollapsed = useDerivedValue(
    () => interpolate(containerHeight.value, [fromHeight, toHeight], [0, 1]),
    [],
  );

  // START // Animation fix /////////////////////////////////////////////////
  /**
   * [Android] Height of animated view stuck in the ~middle of collapsed/expanded state.
   * Only for initial render (next changes of HEIGHT fixes the problem).
   * So added extra 1px to height and set it (extra height) to 0px after 500ms.
   * Just to force rerender and recalculation of animated state
   */
  const [fakeExtraHeight, setFakeExtraHeight] = useState(
    Platform.OS === 'android' ? 1 : 0,
  );
  useLayoutEffect(() => {
    setTimeout(() => {
      setFakeExtraHeight(0);
    }, 500);
  }, []);
  // END // Animation fix /////////////////////////////////////////////////

  const collapseAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value + fakeExtraHeight,
    };
  }, [fakeExtraHeight]);

  return {
    isCollapsed,
    sharedIsCollapsed,
    collapseAnimatedStyle,
  };
};
