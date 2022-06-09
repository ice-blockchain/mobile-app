// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {LottieAnimations} from '@lottie';
import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {MiningInactiveIcon} from '@svg/MiningInactiveIcon';
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  AppState,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {rem} from 'rn-units';

export const TabBarMiningItem = () => {
  const [miningActive, setMiningActive] = useState(false);
  const staticIconFadeAnim = useRef(new Animated.Value(1)).current;
  const lottieFadeAnim = useRef(new Animated.Value(1)).current;
  const lottieRef = useRef<LottieView>(null);

  /**
   * Fade in / out of inactive icon overlay above the mining animation
   * If the mining is not active -> stop the animation
   */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(lottieFadeAnim, {
        toValue: miningActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(staticIconFadeAnim, {
        toValue: miningActive ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        if (miningActive) {
          lottieRef.current?.play();
        } else {
          lottieRef.current?.pause();
        }
      }
    });
  }, [miningActive, staticIconFadeAnim, lottieFadeAnim]);

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
  }, [miningActive]);

  return (
    <ImageBackground
      style={styles.container}
      source={Images.tabbar.miningBackground}>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        activeOpacity={1}
        onPress={() => setMiningActive(state => !state)}>
        <Animated.View style={{opacity: lottieFadeAnim}}>
          <LottieView
            style={styles.animation}
            source={LottieAnimations.minings}
            autoPlay={true}
            loop={true}
            ref={lottieRef}
          />
        </Animated.View>
        <Animated.View
          style={[styles.inactiveIcon, {opacity: staticIconFadeAnim}]}>
          <MiningInactiveIcon size={rem(79)} />
        </Animated.View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MAIN_TAB_BAR_HEIGHT,
    width: rem(112),
  },
  button: {
    position: 'absolute',
    left: rem(7),
    top: rem(-42),
    height: rem(100),
    width: rem(100),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  animation: {
    width: rem(67),
    height: rem(67),
  },
  inactiveIcon: {
    position: 'absolute',
    top: rem(11),
    left: rem(11),
  },
});
