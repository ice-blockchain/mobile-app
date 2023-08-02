// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export type PromoItemData = {
  image: ImageRequireSource;
  title: string;
  description: string;
  actionText: string;
};

type Props = {
  data: PromoItemData;
};

export function PromoItem({data}: Props) {
  return (
    <View style={styles.container}>
      <Image source={data.image} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.action}>{data.actionText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: rem(16),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    marginBottom: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  title: {
    paddingTop: rem(16),
    ...font(16, 19, 'bold', 'primaryDark'),
  },
  description: {
    paddingTop: rem(12),
    ...font(12, 16, 'regular', 'emperor'),
  },
  action: {
    paddingTop: rem(12),
    textDecorationLine: 'underline',
    ...font(12, 16, 'regular', 'primaryLight'),
  },
  image: {
    alignSelf: 'center',
  },
});
