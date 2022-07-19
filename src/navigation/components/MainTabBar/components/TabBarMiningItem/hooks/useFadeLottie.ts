// SPDX-License-Identifier: BUSL-1.1

import LottieView from 'lottie-react-native';
import {RefObject, useEffect, useRef} from 'react';
import {Animated, AppState} from 'react-native';

export const useFadeLottie = (
  miningActive: boolean,
  lottieRef: RefObject<LottieView>,
) => {
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  /**
   * Fade in / out of inactive icon overlay above the mining animation
   * If the mining is not active -> stop the animation
   */
  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: miningActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        if (miningActive) {
          lottieRef.current?.play();
        } else {
          lottieRef.current?.pause();
        }
      }
    });
  }, [miningActive, animatedOpacity, lottieRef]);

  /**
   * Lottie stops playing if the app goes background so we resume it manually
   */
  useEffect(() => {
    if (miningActive) {
      const listener = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'active') {
          lottieRef.current?.play();
        }
      });
      return listener.remove;
    }
  }, [lottieRef, miningActive]);

  return {animatedOpacity};
};
