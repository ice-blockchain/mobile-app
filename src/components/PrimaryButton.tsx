// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {rem, font} from 'rn-units';
import {FONTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
}

const PrimaryButton = ({onPress, text}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
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

export default PrimaryButton;
