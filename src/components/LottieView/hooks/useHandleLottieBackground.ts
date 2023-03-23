// SPDX-License-Identifier: ice License 1.0

import {LottieViewMethods} from '@components/LottieView';
import {RefObject, useEffect} from 'react';
import {AppState} from 'react-native';

export const useHandleLottieBackground = (
  lottieRef: RefObject<LottieViewMethods>,
) => {
  /**
   * Lottie stops playing if the app goes background so we resume it manually
   */
  useEffect(() => {
    const listener = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        lottieRef.current?.play();
      }
    });
    return listener.remove;
  }, [lottieRef]);
};
