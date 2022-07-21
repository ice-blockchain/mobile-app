// SPDX-License-Identifier: BUSL-1.1

import {LogoSvg} from '@svg/Logo';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

type SpinLogoType = {
  width?: number;
  height?: number;
};

export const SpinLogoAnimation = ({width, height}: SpinLogoType) => {
  const spinValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue.current, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }),
    ).start();
  }, []);

  const spin = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <LogoSvg width={width} height={height} />
    </Animated.View>
  );
};
