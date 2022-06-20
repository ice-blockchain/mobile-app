// SPDX-License-Identifier: BUSL-1.1

import TiersSwitcher from '@screens/Team/components/TiersSwitcher';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Tears = () => {
  return (
    <View style={styles.container}>
      <TiersSwitcher />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
