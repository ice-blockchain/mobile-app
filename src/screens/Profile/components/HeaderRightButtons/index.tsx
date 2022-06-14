// SPDX-License-Identifier: BUSL-1.1

import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {NotificationsButton} from '@navigation/components/Header/components/NotificationsButton';
import {SettingsButton} from '@navigation/components/Header/components/SettingsButton';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const HeaderRightButtons = () => {
  return (
    <View style={styles.container}>
      <NotificationsButton />
      <SettingsButton containerStyle={styles.settingsButton} />
      <FaqButton containerStyle={styles.faqButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqButton: {
    marginLeft: 8,
  },
  settingsButton: {
    marginLeft: 12,
  },
});
