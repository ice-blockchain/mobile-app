// SPDX-License-Identifier: ice License 1.0

import {hapticFeedback} from '@utils/device';
import {useCallback, useRef} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

export const useOnRefresh = (animatedIndex: SharedValue<number>) => {
  const dispatch = useDispatch();

  const refreshing = true; //replace with correct isLoadingSelector

  const onRefresh = useCallback(() => {
    console.log('dispatch', dispatch);
  }, [dispatch]);

  const canBeActivatedRef = useRef(false);
  const hapticOnRefresh = () => {
    if (canBeActivatedRef.current) {
      hapticFeedback();
      onRefresh();
      canBeActivatedRef.current = false;
    }
  };

  const resetHapticOnRefresh = () => {
    canBeActivatedRef.current = true;
  };

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.18;
    },
    isNeedRefresh => {
      if (isNeedRefresh) {
        runOnJS(hapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.05 && animatedIndex.value >= -0.1;
    },
    reset => {
      if (reset) {
        runOnJS(resetHapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  return {onRefresh, refreshing};
};
