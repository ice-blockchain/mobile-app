// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';

type Props = {
  onPress: () => void;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const ConfirmCodeBack = ({onPress, text, textStyle, style}: Props) => (
  <Touchable onPress={onPress} hitSlop={MIDDLE_BUTTON_HIT_SLOP} style={style}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </Touchable>
);

const styles = StyleSheet.create({
  buttonText: {
    ...font(15, 20, 'medium', 'secondary', 'center'),
  },
});
