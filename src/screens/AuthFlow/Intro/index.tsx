// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Intro = () => {
  return (
    <View style={styles.container}>
      <Text>Intro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
