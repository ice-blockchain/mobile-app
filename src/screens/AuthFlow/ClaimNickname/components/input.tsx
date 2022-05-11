// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {font, rem} from 'rn-units';

interface CommonInputProps extends TextInputProps {
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  leftIcon?: JSX.Element;
}

const CommonInput = ({
  errorText,
  containerStyle,
  inputStyle,
  leftIcon,
  ...props
}: CommonInputProps) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        errorText ? styles.inputError : null,
      ]}>
      {leftIcon || null}

      <View>
        <TextInput style={[styles.input, inputStyle]} {...props} />
        {errorText ? (
          <Text style={styles.errorText}>{'error text'}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default CommonInput;

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
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    paddingLeft: rem(6),
    flex: 1,
    color: COLORS.darkBlue,
    fontSize: font(16),
    lineHeight: rem(19),
    fontFamily: FONTS.primary.regular,
  },
  errorText: {
    color: COLORS.error,
    fontSize: font(11),
    paddingLeft: rem(6),
    fontFamily: FONTS.primary.regular,
  },
});
