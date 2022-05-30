// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Team = () => {
  return (
    <View style={styles.container}>
      <Text>Team</Text>
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
