// SPDX-License-Identifier: BUSL-1.1

import {ContactsPermissions} from '@screens/Team/components/ContactsPermissions';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Contacts = () => {
  return (
    <View style={styles.container}>
      <ContactsPermissions />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
