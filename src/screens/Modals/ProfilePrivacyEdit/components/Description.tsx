// SPDX-License-Identifier: ice License 1.0

import {TouchFinger} from '@svg/TouchFinger';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
  description: string;
};

export const Description = ({title, description, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchFinger />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(84),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    alignSelf: 'center',
    marginLeft: rem(12),
  },
  title: {
    ...font(20, 25, 'medium'),
  },
  description: {
    ...font(15, 20, 'medium'),
    marginTop: rem(10),
  },
});
