// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {PEN_SIZE} from '@screens/ProfileFlow/Profile/components/AvatarHeader/hooks/useAnimatedStyles';
import {AnimatedCameraIcon} from '@svg/AnimatedCameraIcon';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Animated, {AnimatedStyleProp} from 'react-native-reanimated';
import {rem} from 'rn-units';

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

type Props = {
  onPress: () => void;
  loading?: boolean;
  containerStyle?: AnimatedStyleProp<ViewStyle>;
  iconStyle?: AnimatedStyleProp<ViewStyle>;
};

export const EditAvatarButton = ({
  onPress,
  loading,
  containerStyle,
  iconStyle,
}: Props) => {
  return (
    <AnimatedTouchable
      style={[styles.penWrapper, containerStyle]}
      onPress={onPress}
      disabled={loading}
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
      {loading ? (
        <ActivityIndicator style={StyleSheet.absoluteFill} />
      ) : (
        <AnimatedCameraIcon style={iconStyle} />
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  penWrapper: {
    position: 'absolute',
    bottom: -rem(10),
    right: -rem(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: PEN_SIZE,
    height: PEN_SIZE,
    borderRadius: PEN_SIZE / 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    marginHorizontal: rem(10),
    marginVertical: rem(10),
  },
});
