// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {POPUP_SIDE_OFFSET} from '@constants/styles';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Notice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>
        Ice mining activity has ended. As we gear up for the mainnet launch on
        October 7th, 2024, keep the app installed for exclusive updates and
        early access to mainnet app.
      </Text>
      <RoundedTriangle
        fill={COLORS.primaryDark}
        style={styles.chevron}
        width={rem(13)}
        height={rem(10)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(26),
    marginBottom: rem(8),
    marginHorizontal: POPUP_SIDE_OFFSET,
    paddingHorizontal: rem(16),
    paddingTop: rem(10),
    paddingBottom: rem(12),
    backgroundColor: COLORS.primaryDark,
    borderRadius: rem(16),
  },
  labelText: {
    ...font(15, undefined, 'semibold', 'white', 'center'),
  },
  chevron: {
    position: 'absolute',
    bottom: -rem(8),
    alignSelf: 'center',
    transform: [{rotate: '180deg'}],
  },
});
