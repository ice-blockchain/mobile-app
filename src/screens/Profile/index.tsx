// SPDX-License-Identifier: BUSL-1.1

import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  navigation: BottomTabNavigationProp<MainTabsParamList, 'ProfileTab'>;
};

export const Profile = ({navigation}: Props) => {
  //TODO::add useAppNavigation
  const openSettings = () => {
    navigation.navigate('NewsTab');
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
