// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import {Images} from '@images';
import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';

type Props = {
  style?: StyleProp<ImageStyle>;
};

const RATIO = 1.12;

export const LinesBackground = ({style}: Props) => {
  return (
    <Image
      source={Images.backgrounds.linesBg}
      style={[styles.background, style]}
      resizeMode={'contain'}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: windowWidth,
    height: windowWidth * RATIO,
  },
});
