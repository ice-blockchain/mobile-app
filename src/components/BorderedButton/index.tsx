// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

interface BorderedButtonProps {
  onPress: () => void;
  text: string;
  icon: ReactNode;
}

export const BorderedButton = ({onPress, text, icon}: BorderedButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: rem(247),
    height: rem(45),
    borderRadius: 11,
    borderWidth: rem(1.5),
    borderColor: COLORS.greyBorder,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: rem(14),
  },
  icon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.darkBlue,
    fontSize: font(14),
    lineHeight: rem(16.8),
  },
});
