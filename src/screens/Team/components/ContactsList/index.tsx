// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ContactsListProps {}

const ContactsList = ({}: ContactsListProps) => {
  return (
    <View style={styles.container}>
      <Text>ContactsList</Text>
    </View>
  );
};

export default ContactsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
