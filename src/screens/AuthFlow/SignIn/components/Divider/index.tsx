// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP, smallHeightDevice} from '@constants/styles';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {rem} from 'rn-units';

export const DIVIDER_VERTICAL_MARGIN = smallHeightDevice ? rem(18) : rem(28);

type Props = {
  label: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
};

export const Divider = ({label, onPress, textStyle}: Props) => {
  return (
    <Touchable
      style={styles.container}
      onPress={onPress}
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
      <Text style={[styles.orText, textStyle]}>{label}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: DIVIDER_VERTICAL_MARGIN,
    marginBottom: DIVIDER_VERTICAL_MARGIN - rem(5),
  },
  orText: {
    textTransform: 'uppercase',
    ...font(10, 12, 'regular', 'secondary', 'center'),
  },
});
