// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {INFO_HEIGHT} from '@screens/Team/components/Header/components/Info';
import {ReactNode} from 'react';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  children: ReactNode;
  animatedIndex: SharedValue<number>;
};

export const STATIC_CONTENT_TOP_OFFSET = rem(20);

export const StaticContainer = ({children, animatedIndex}: Props) => {
  const animatedImageContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 1],
          [0, -INFO_HEIGHT - STATIC_CONTENT_TOP_OFFSET],
          {
            extrapolateLeft: Extrapolate.CLAMP,
          },
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.imageContainer, animatedImageContainerStyle]}>
      <LinesBackground />
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: STATIC_CONTENT_TOP_OFFSET,
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
  },
});
