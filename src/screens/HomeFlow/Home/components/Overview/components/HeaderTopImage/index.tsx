// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';

const HEADER_RECTANGLE = require('@screens/HomeFlow/Home/assets/images/topRectangle.png');

export const HEADER_TOP_IMAGE_HEIGHT = windowWidth * 0.08;

export const HeaderTopImage = memo(() => {
  return (
    <Image
      fadeDuration={0}
      style={styles.headerTopImage}
      resizeMethod="resize"
      source={HEADER_RECTANGLE}
    />
  );
});

export const styles = StyleSheet.create({
  headerTopImage: {
    width: windowWidth,
    height: HEADER_TOP_IMAGE_HEIGHT,
    backgroundColor: COLORS.primaryLight,
    marginTop: -1,
  },
});
