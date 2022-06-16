// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {font, rem} from 'rn-units';

export const InviteNote = () => (
  <Text style={styles.text}>
    Spread the word and invite your friends. The more refferals, the more you’ll
    earn!
  </Text>
);

const styles = StyleSheet.create({
  text: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(28),
    fontSize: font(14),
    lineHeight: font(20),
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
});
