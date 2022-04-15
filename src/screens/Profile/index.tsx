// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import navigation from '@navigation/index';

const Profile = () => {
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

export default Profile;
