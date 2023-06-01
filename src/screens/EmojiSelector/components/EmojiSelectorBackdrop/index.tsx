// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export function EmojiSelectorBackdrop({
  animatedIndex,
}: BottomSheetBackdropProps) {
  const navigation = useNavigation();
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        animatedIndex.value,
        [-1, 0, 1],
        [0, 1, 1],
        Extrapolate.CLAMP,
      ),
    }),
    [],
  );
  return (
    <Pressable style={commonStyles.flexOne} onPress={navigation.goBack}>
      <Animated.View style={[styles.backdrop, containerAnimatedStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
});
