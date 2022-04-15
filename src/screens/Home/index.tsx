// SPDX-License-Identifier: BUSL-1.1

import testIDs from '../../../e2e/testIDs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container} testID={testIDs.screens.home.screen}>
      <Text testID="hello">Home</Text>
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

export default Home;
