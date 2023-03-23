// SPDX-License-Identifier: ice License 1.0

import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {screenWidth} from 'rn-units';

export const Background = () => {
  return (
    <Image
      source={require('../../assets/images/background.png')}
      style={styles.backgroundImage}
      resizeMode={'cover'}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: (screenWidth / 375) * 650,
  },
});
