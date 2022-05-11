// SPDX-License-Identifier: BUSL-1.1

import React, {ReactNode} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {rem, font} from 'rn-units';
import {FONTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';

interface BorderedButtonProps {
  onPress: () => void;
  text: string;
  icon: ReactNode;
}

const BorderedButton = ({onPress, text, icon}: BorderedButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View>{icon}</View>
      <Text style={styles.text}>{text}</Text>
      <View />
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
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.darkBlue,
    fontSize: font(14),
    lineHeight: rem(16.8),
  },
});

export default BorderedButton;
