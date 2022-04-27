// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {rem, font} from 'rn-units';

import {FONTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';

interface ButtonProps {
  onPress: () => void;
  text: string;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

const Button = ({onPress, text, rightIcon, leftIcon}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {leftIcon || null}
      <Text style={styles.text}>{text}</Text>
      {rightIcon || null}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: rem(96),
    height: rem(41),
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    fontSize: font(14),
    paddingHorizontal: rem(4),
    lineHeight: 17,
  },
});
