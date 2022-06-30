// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
  children: ReactNode;
};

export const ListControlBase = ({label, children}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      {children}
    </View>
  );
};

export const ListControlSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    height: rem(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    width: '25%',
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.bold,
    fontSize: font(12),
    lineHeight: font(14),
    marginLeft: rem(28),
    marginRight: rem(6),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.linkWater,
  },
});
