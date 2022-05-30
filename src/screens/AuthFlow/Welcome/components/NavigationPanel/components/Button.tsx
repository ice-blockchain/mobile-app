// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';
interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

export const Button = ({
  onPress,
  text,
  rightIcon,
  leftIcon,
  style,
  textStyle,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, disabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled}>
      {leftIcon || null}
      <Text
        style={[styles.text, textStyle, disabled ? styles.disabledText : null]}>
        {text}
      </Text>
      {rightIcon || null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(96),
    height: rem(41),
    backgroundColor: COLORS.primary,
    borderRadius: rem(11),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    fontSize: font(14),
    paddingHorizontal: rem(4),
    lineHeight: rem(17),
  },
  disabled: {
    backgroundColor: COLORS.greyBorder,
  },
  disabledText: {
    color: COLORS.white,
  },
});
