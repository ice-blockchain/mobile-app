// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const OkxWalletCard = ({style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.card} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(16),
    padding: rem(14),
    alignItems: 'center',
  },
});
