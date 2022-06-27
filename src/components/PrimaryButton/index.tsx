// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle | FlexStyle>;
}

export const PrimaryButton = ({
  onPress,
  text,
  style = {},
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: rem(247),
    height: rem(45),
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    fontSize: font(14),
    lineHeight: rem(16.8),
  },
});
