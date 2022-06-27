// SPDX-License-Identifier: BUSL-1.1

import {translate} from '@translations/i18n';
import React from 'react';
import {StyleProp, StyleSheet, Text as RNText, TextStyle} from 'react-native';

type TextProps = {
  text?: string;
  options?: object;
  children?: React.ReactNode;
  value?: String;
  centered?: boolean;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export function Text({
  text,
  options,
  children,
  value,
  centered,
  style,
  ...rest
}: TextProps): React.ReactElement {
  return (
    <RNText
      style={StyleSheet.compose([centered && {textAlign: 'center'}], style)}
      {...rest}
      allowFontScaling={false}>
      {text && translate(text, options)}
      {value}
      {children}
    </RNText>
  );
}
