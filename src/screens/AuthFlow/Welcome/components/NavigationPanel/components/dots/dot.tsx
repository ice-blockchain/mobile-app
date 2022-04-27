// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';

interface DotProps {
  isActive: boolean;
}

const Dot = ({isActive}: DotProps) => {
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

export default Dot;

const styles = StyleSheet.create({
  dot: {
    height: 5,
    borderRadius: 4,
    marginRight: 3,
    width: 5,
    backgroundColor: COLORS.greyText,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
});
