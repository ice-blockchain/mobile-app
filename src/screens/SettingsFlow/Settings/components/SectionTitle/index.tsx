// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string;
};

export const SectionTitle = ({text}: Props) => {
  return <Text style={styles.titleText}>{text}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    marginTop: rem(26),
    marginBottom: rem(11),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    ...font(14, 19, 'semibold', 'primaryDark'),
  },
});
