// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

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
    marginRight: rem(14),
    marginLeft: rem(24),
    marginTop: rem(4),
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  percValueText: {
    ...font(14, 17, 'bold', 'primaryDark'),
  },
  percLabelText: {
    textAlign: 'right',
    flex: 1,
    ...font(12, 15, 'medium', 'periwinkleGray'),
  },
  progressBody: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.secondaryFaint,
    alignSelf: 'stretch',
    marginTop: rem(10),
  },
  progressValue: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
});
