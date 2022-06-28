// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  text: string;
};

export const SectionTitle = ({text}: Props) => {
  return <Text style={styles.titleText}>{text}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.primary.bold,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
    marginTop: rem(42),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
