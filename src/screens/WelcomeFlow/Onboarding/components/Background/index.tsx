// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

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
    width: windowWidth,
    height: (windowWidth / 375) * 650,
  },
});
