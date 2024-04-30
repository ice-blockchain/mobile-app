// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  title: string;
  icon: number;
  style?: StyleProp<ViewStyle>;
};

export const ShareButton = ({title, icon, onPress, style}: Props) => {
  return (
    <Touchable style={style} onPress={onPress}>
      <Image style={styles.icon} source={icon} />
      <Text style={styles.buttonTitle}>{title}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: rem(56),
    height: rem(56),
  },
  buttonTitle: {
    marginTop: rem(8),
    ...font(11, 18, 'regular', 'secondary', 'center'),
  },
});
