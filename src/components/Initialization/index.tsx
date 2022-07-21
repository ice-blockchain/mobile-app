// SPDX-License-Identifier: BUSL-1.1

import {SpinLogoAnimation} from '@components/SpinLogoAnimation';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Initialization = () => {
  return (
    <View style={styles.container}>
      <SpinLogoAnimation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
