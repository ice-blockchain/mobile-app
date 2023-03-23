// SPDX-License-Identifier: ice License 1.0

import {Listener} from '@screens/Team/types';
import throttle from 'lodash/throttle';
import {useCallback, useMemo, useRef} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';

export function useOnChangeToCollapsedSnapPoint(
  animatedIndex: SharedValue<number>,
) {
  const collapsedSnapPointListenersRef = useRef<Map<string, Listener>>(
    new Map<string, Listener>(),
  );
  const addCollapsedSnapPointListener = useCallback(
    (key: string, listener: Listener) => {
      collapsedSnapPointListenersRef.current.set(key, listener);
    },
    [collapsedSnapPointListenersRef],
  );
  const onChangeToCollapsedSnapPoint = useMemo(
    () =>
      throttle(() => {
        collapsedSnapPointListenersRef.current.forEach((listener: Listener) =>
          listener(),
        );
      }, 300),
    [collapsedSnapPointListenersRef],
  );

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= 0;
    },
    scrollUp => {
      if (scrollUp) {
        runOnJS(onChangeToCollapsedSnapPoint)();
      }
    },
    [animatedIndex],
  );

  return {addCollapsedSnapPointListener};
}
