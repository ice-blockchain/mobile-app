// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {formatTimestamp} from '@utils/date';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  timestamp: number;
};

export function ChannelSectionHeader({timestamp}: Props) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {formatTimestamp({timestamp, format: 'D MMMM'})}
        </Text>
      </View>
      <View style={commonStyles.flexOne} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: SCREEN_SIDE_OFFSET,
    flexDirection: 'row',
  },
  container: {
    borderRadius: rem(20),
    backgroundColor: COLORS.secondaryFaint,
    paddingVertical: rem(4),
    paddingHorizontal: rem(14),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 2,
  },
  text: {
    ...font(12, 15, 'semibold', 'primaryLight'),
  },
});
