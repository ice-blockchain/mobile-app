// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HeaderRightButtons} from '@screens/Profile/components/HeaderRightButtons';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Profile = () => {
  useFocusStatusBar('light-content');

  return (
    <View style={styles.container}>
      <Header color={COLORS.white} renderRightButtons={HeaderRightButtons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
});
