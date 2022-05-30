// SPDX-License-Identifier: BUSL-1.1

import {navigation} from '@navigation/index';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Profile = () => {
  const openSettings = () => {
    navigation.navigate('Settings');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openSettings}>
        <Text style={styles.settings}>Settings Button</Text>
      </TouchableOpacity>
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
  settings: {
    color: 'white',
  },
});
