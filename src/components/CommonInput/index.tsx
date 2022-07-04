// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {ReactNode} from 'react';
import {
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
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  errorText?: string;
}

export const CommonInput = ({
  icon,
  containerStyle,
  errorText,
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
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor={COLORS.greyBorder}
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
    position: 'absolute',
    bottom: 0,
    color: COLORS.error,
    fontSize: font(11),
    paddingLeft: rem(6),
    fontFamily: FONTS.primary.regular,
  },
  inputWrapper: {
    flex: 1,
  },
});
