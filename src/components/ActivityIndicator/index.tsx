// SPDX-License-Identifier: ice License 1.0

import {LottieView} from '@components/LottieView';
import {LottieAnimations} from '@lottie';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

export type ActivityIndicatorTheme = 'light-content' | 'dark-content';

interface Props {
  style?: StyleProp<ViewStyle>;
  theme?: ActivityIndicatorTheme;
}

export const ActivityIndicator = ({style, theme}: Props) => (
  <LottieView
    style={[styles.animation, style]}
    source={
      theme === 'dark-content'
        ? LottieAnimations.whiteLoader
        : LottieAnimations.loader
    }
    autoPlay
    loop
  />
);

const styles = StyleSheet.create({
  animation: {
    width: rem(32),
    height: rem(32),
  },
});
