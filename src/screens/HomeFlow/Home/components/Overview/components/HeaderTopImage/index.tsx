// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {DISTANCE_TO_OVERLAP} from '@screens/HomeFlow/Home/components/constants';
import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';

const HEADER_RECTANGLE = require('@screens/HomeFlow/Home/assets/images/topRectangle.png');

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
    backgroundColor: COLORS.primaryLight,
    marginTop: -DISTANCE_TO_OVERLAP,
  },
});
