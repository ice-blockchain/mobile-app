// SPDX-License-Identifier: ice License 1.0

import {LottieView} from '@components/LottieView';
import {COLORS} from '@constants/colors';
import {LottieAnimations} from '@lottie';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {
  appInitStateSelector,
  isSplashHiddenSelector,
} from '@store/modules/AppCommon/selectors';
import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {screenWidth} from 'rn-units';

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
    <View style={styles.container}>
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: screenWidth,
    height: screenWidth * 2.165,
  },
});
