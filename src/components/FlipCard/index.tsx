// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export enum CardSide {
  FRONT,
  BACK,
}

export type FlipCardMethods = {
  changeSide: () => void;
};

interface FlipCardProps {
  stylesContainer: StyleProp<ViewStyle>;
  front: ReactNode;
  back: ReactNode;
  perspective?: number;
  disabled?: boolean;
}

export const FlipCard = forwardRef<FlipCardMethods, FlipCardProps>(
  (
    {perspective = 500, front, back, stylesContainer, disabled}: FlipCardProps,
    forwardedRef: Ref<FlipCardMethods>,
  ) => {
    const [side, setSide] = useState(CardSide.BACK);

    const changeSide = () => {
      setSide(prev =>
        prev === CardSide.FRONT ? CardSide.BACK : CardSide.FRONT,
      );
    };

    const rotatePosition = interpolate(side, [0, 1], [180, 360]);

    const rotateValue = useDerivedValue(() => {
      return withTiming(rotatePosition, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    });

    const rotationFlip = useDerivedValue(() => {
      return {
        rotateY: `${rotateValue.value}deg`,
      };
    }, [rotateValue]);

    const rotationFlipBack = useDerivedValue(() => {
      return {
        rotateY: '180deg',
      };
    }, []);

    const animatedStyleFront = useAnimatedStyle(() => {
      return {
        transform: [{perspective}, {...rotationFlip.value}],
      };
    }, [side, rotationFlip]);

    const animatedStyleBack = useAnimatedStyle(() => {
      return {
        transform: [
          {perspective},
          {...rotationFlipBack.value},
          {...rotationFlip.value},
        ],
      };
    }, [side]);

    useImperativeHandle(forwardedRef, () => ({changeSide}));

    return (
      <Touchable
        style={stylesContainer}
        onPress={changeSide}
        disabled={disabled}>
        <Animated.View style={stylesContainer}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              animatedStyleBack,
              styles.visibility,
            ]}>
            {back}
          </Animated.View>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              animatedStyleFront,
              styles.visibility,
            ]}>
            {front}
          </Animated.View>
        </Animated.View>
      </Touchable>
    );
  },
);

const styles = StyleSheet.create({
  visibility: {
    backfaceVisibility: 'hidden',
  },
});
