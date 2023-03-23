// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {screenWidth} from 'rn-units';

type Props = {
  style?: StyleProp<ImageStyle>;
};

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
    width: screenWidth,
    height: undefined,
    aspectRatio: 375 / 420,
  },
});
