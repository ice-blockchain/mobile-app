// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const FullScreenLoading = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ActivityIndicator color={COLORS.white} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
