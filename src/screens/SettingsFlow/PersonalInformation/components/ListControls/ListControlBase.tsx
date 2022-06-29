// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {memo, ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
  onLabelPress: () => void;
  children: ReactNode;
};

export const ListControlBase = memo(
  ({label, onLabelPress, children}: Props) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.label} onPress={onLabelPress}>
          <Text style={styles.labelText}>{label}</Text>
        </TouchableOpacity>
        <View style={styles.body}>{children}</View>
      </View>
    );
  },
);

export const ListControlSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    height: rem(50),
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    justifyContent: 'center',
  },
  labelText: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.bold,
    fontSize: font(12),
    lineHeight: font(14),
    marginLeft: rem(28),
    marginRight: rem(6),
  },
  body: {
    width: '65%',
    marginRight: rem(12),
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.linkWater,
  },
});
