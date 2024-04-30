// SPDX-License-Identifier: ice License 1.0

import {MINING_LONG_PRESS_ACTIVATION_SEC} from '@constants/timeouts';
import React from 'react';
import {ReactNode} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  onTap: () => void;
  onLongPress: () => void;
  activationGesture?: 'tap' | 'longPress';
  children: ReactNode;
};

export const MiningButtonHandlers = ({onTap, onLongPress, children}: Props) => {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonScale.value}],
    };
  });

  let longPressTimer: null | ReturnType<typeof setTimeout> = null;

  const activateLongPress = () => {
    longPressTimer = setTimeout(() => {
      buttonScale.value = withTiming(1, {duration: 300}, () =>
        runOnJS(onLongPress)(),
      );
    }, MINING_LONG_PRESS_ACTIVATION_SEC * 1000);
  };

  const clearTimer = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  const longPress = Gesture.LongPress()
    .onStart(() => {
      buttonScale.value = withTiming(1.2);
      runOnJS(activateLongPress)();
    })
    .onEnd(() => {
      runOnJS(clearTimer)();
      buttonScale.value = withTiming(1);
    });

  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      runOnJS(onTap)();
    }
  });

  return (
    <GestureDetector gesture={Gesture.Exclusive(longPress, singleTap)}>
      <Animated.View style={buttonAnimatedStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};
