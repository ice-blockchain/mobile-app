// SPDX-License-Identifier: ice License 1.0

import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

export const useScreenFade = <T extends string>(currentScreen: T) => {
  const [visibleScreen, setVisibleScreen] = useState(currentScreen);

  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const showScreen = useCallback(
    (newVisibleFlow: T) => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisibleScreen(newVisibleFlow);
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    },
    [fadeAnimation],
  );

  useEffect(() => {
    if (currentScreen !== visibleScreen) {
      showScreen(currentScreen);
    }
  }, [currentScreen, showScreen, visibleScreen]);

  return {
    fadeStyle: {opacity: fadeAnimation},
    visibleScreen,
  };
};
