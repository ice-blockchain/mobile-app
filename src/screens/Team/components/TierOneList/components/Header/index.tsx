// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

export const ListHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Active: 2/25</Text>
      <Text style={styles.title}>Tier 1 Earnings: 94,412 ice</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.darkBlue,
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(22),
  },
});
