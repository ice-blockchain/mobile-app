// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

const BULLET_SIDE_DIMENSION = rem(6);

type Props = {
  text: string | ReactNode;
  style?: StyleProp<ViewStyle>;
  bulletContainerStyle?: StyleProp<ViewStyle>;
  bulletStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
export const BulletDescription = ({
  text,
  style,
  bulletContainerStyle,
  bulletStyle,
  textStyle,
  ...props
}: Props) => {
  return (
    <View style={[styles.pointContainer, style]} {...props}>
      <View style={[styles.bulletContainer, bulletContainerStyle]}>
        <View style={[styles.bullet, bulletStyle]} />
      </View>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pointContainer: {
    marginTop: rem(16),
    flexDirection: 'row',
  },
  bulletContainer: {
    width: rem(21),
    alignItems: 'center',
  },
  bullet: {
    width: BULLET_SIDE_DIMENSION,
    height: BULLET_SIDE_DIMENSION,
    borderRadius: BULLET_SIDE_DIMENSION / 2,
    backgroundColor: COLORS.secondary,
    marginTop: rem(7),
  },
  text: {
    flex: 1,
    ...font(14, 19, 'medium', 'secondary', 'left'),
  },
});
