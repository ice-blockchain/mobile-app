// SPDX-License-Identifier: ice License 1.0

import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  label: string;
};

const EMPTY_HISTORY_IMAGE = require('../assets/images/emptyHistory.png');

export const EmptyHistory = ({label}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={EMPTY_HISTORY_IMAGE} />
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: rem(30),
  },
  labelText: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
    marginTop: rem(16),
    maxWidth: rem(168),
  },
});
