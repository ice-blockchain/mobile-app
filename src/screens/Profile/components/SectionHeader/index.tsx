// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font} from 'rn-units';

type Props = {
  title: string;
  onViewAllPress: () => void;
};

export const SectionHeader = ({title, onViewAllPress}: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity hitSlop={viewAllHitSlop} onPress={onViewAllPress}>
        <Text style={styles.viewAllText}>view all</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
  },
  viewAllText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: font(15),
    color: COLORS.darkBlue,
  },
});

const viewAllHitSlop = {top: 10, right: 15, bottom: 10, left: 15};
