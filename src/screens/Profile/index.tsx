// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  navigation: StackNavigationProp<MainStackParamList, 'Profile'>;
};

export const Profile = ({navigation}: Props) => {
  //TODO::add useAppNavigation
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
