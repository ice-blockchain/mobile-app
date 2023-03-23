// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Divider = () => {
  return (
    <View style={styles.divider}>
      <Text
        ellipsizeMode="clip"
        numberOfLines={1}
        style={styles.dividerDashText}>
        - - - - - - - - - - - - - - - - - -
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dividerDashText: {
    color: COLORS.white,
    opacity: 0.3,
    marginHorizontal: rem(10),
  },
});
