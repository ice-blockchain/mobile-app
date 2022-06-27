// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Invite = () => {
  return (
    <View style={styles.container}>
      <Text>INVITE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    color: 'white',
  },
});
