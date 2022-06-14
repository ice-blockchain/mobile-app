// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Profile = () => {
  useFocusStatusBar('light-content');

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
});
