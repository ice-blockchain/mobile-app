// SPDX-License-Identifier: ice License 1.0

import {LottieView} from '@components/LottieView';
import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {LottieAnimations} from '@lottie';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {
  appInitStateSelector,
  isSplashHiddenSelector,
} from '@store/modules/AppCommon/selectors';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useDispatch, useSelector} from 'react-redux';

export const AnimatedSplash = () => {
  const appInitState = useSelector(appInitStateSelector);
  const [animationFinished, setAnimationFinished] = useState(false);
  const isSplashHidden = useSelector(isSplashHiddenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (appInitState !== 'loading' && animationFinished && !isSplashHidden) {
      dispatch(AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.create());
    }
  }, [animationFinished, appInitState, isSplashHidden, dispatch]);

  const finishAnimation = useCallback((isCancelled: boolean) => {
    if (!isCancelled) {
      setAnimationFinished(true);
    }
  }, []);

  if (isSplashHidden) {
    return null;
  }

  return (
    <View
      // Hiding native splash view in `onLayout` callback to make sure that the
      // AnimatedSplash component is displayed on the screen.
      // Using `useEffect` in this case leads to a white flickering on Android.
      onLayout={() => BootSplash.hide()}
      style={[styles.container, StyleSheet.absoluteFill]}>
      <LottieView
        style={styles.animation}
        source={LottieAnimations.splashLogo}
        autoPlay
        loop={false}
        onAnimationFinish={finishAnimation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: windowWidth,
    height: windowWidth * 2.165,
  },
});
