// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    paddingTop: rem(16),
  },
});
