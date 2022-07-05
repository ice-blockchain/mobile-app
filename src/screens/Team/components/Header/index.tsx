// SPDX-License-Identifier: BUSL-1.1

//import liraries
import {defaultSubScreenTopOffset} from '@constants/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: defaultSubScreenTopOffset,
  },
});
