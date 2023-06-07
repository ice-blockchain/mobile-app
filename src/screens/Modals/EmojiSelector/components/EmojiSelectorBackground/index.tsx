// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export function EmojiSelectorBackground() {
  return <View style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});
