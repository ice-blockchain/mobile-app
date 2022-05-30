// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {ReactNode} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {ViewStyle} from 'react-native';
import {font, rem} from 'rn-units';

interface CommonInputProps extends TextInputProps {
  onChangeText: (description: string) => void;
  icon: ReactNode;
  value: string;
  placeholder: string;
  placeholderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  errorText?: string;
  keyboardType?: KeyboardTypeOptions;
}

export const CommonInput = ({
  onChangeText,
  icon,
  value,
  placeholder,
  containerStyle,
  errorText,
  keyboardType,
  ...props
}: CommonInputProps) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        errorText ? styles.inputError : null,
      ]}>
      {icon || null}
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          style={styles.input}
          keyboardType={keyboardType}
          autoCapitalize="none"
          {...props}
        />
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: rem(247),
    paddingHorizontal: rem(13),
    alignItems: 'center',
    borderRadius: rem(13),
    borderWidth: rem(1.5),
    borderColor: COLORS.greyBorder,
    minHeight: rem(46),
  },
  input: {
    paddingLeft: rem(6),
    flex: 1,
    color: COLORS.darkBlue,
    fontSize: font(16),
    lineHeight: rem(19),
    fontFamily: FONTS.primary.regular,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: font(11),
    paddingLeft: rem(6),
    fontFamily: FONTS.primary.regular,
  },
  inputWrapper: {
    flex: 1,
  },
});
