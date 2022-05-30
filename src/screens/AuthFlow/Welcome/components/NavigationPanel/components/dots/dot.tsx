// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {rem} from 'rn-units';

interface DotProps {
  isActive: boolean;
  withError?: boolean;
}

export const Dot = ({isActive, withError}: DotProps) => {
  const widthAnimation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: isActive ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isActive, widthAnimation]);

  return (
    <Animated.View
      style={[
        styles.dot,
        isActive ? styles.activeDot : null,
        isActive && withError ? styles.error : null,
        {
          width: widthAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [5, 20],
          }),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: rem(5),
    borderRadius: rem(4),
    marginRight: rem(3),
    width: rem(5),
    backgroundColor: COLORS.greyText,
  },
  activeDot: {
    backgroundColor: COLORS.darkBlue,
  },
  error: {
    backgroundColor: COLORS.error,
  },
});
