// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  value: number;
};

export const BadgeProgress = ({value: progressValue}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text
          style={styles.percValueText}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {progressValue} %
        </Text>
        <Text
          style={styles.percLabelText}
          numberOfLines={2}
          adjustsFontSizeToFit>
          of users
        </Text>
      </View>
      <View style={styles.progressBody}>
        <View style={[styles.progressValue, {width: `${progressValue}%`}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(100),
    marginRight: rem(22),
    marginLeft: rem(10),
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  percValueText: {
    fontFamily: FONTS.primary.bold,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
  },
  percLabelText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: font(15),
    color: COLORS.periwinkleGray,
    textAlign: 'right',
    flex: 1,
  },
  progressBody: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.linkWater,
    alignSelf: 'stretch',
    marginTop: rem(10),
  },
  progressValue: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
});
