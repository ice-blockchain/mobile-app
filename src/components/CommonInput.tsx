// SPDX-License-Identifier: BUSL-1.1

import React, {ReactNode} from 'react';
import {TextInput, StyleSheet, View, StyleProp} from 'react-native';
import {rem, font} from 'rn-units';
import {FONTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';
import {ViewStyle} from 'react-native';

interface CommonInputProps {
  onChangeText: (description: string) => void;
  icon: ReactNode;
  value: string;
  placeholder: string;
  placeholderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const CommonInput = ({
  onChangeText,
  icon,
  value,
  placeholder,
  containerStyle,
}: CommonInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.icon}>{icon}</View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(247),
    borderWidth: rem(1.5),
    borderColor: COLORS.greyBorder,
    borderRadius: rem(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: rem(12),
  },
  input: {
    paddingBottom: rem(15),
    paddingTop: rem(14),
    paddingLeft: rem(6),
    fontSize: font(15),
    lineHeight: rem(18),
    fontFamily: FONTS.primary.regular,
  },
});

export default CommonInput;
