// SPDX-License-Identifier: ice License 1.0

import {BulletDescription} from '@components/BulletDescription';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  points: string[];
  description: string;
  bottomDescription?: string | null;
};

export function InfoBlock({
  title,
  points,
  description,
  bottomDescription,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {points.map((point, index) => (
        <BulletDescription text={point} key={index} />
      ))}
      {bottomDescription && (
        <Text style={styles.description}>{bottomDescription}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rem(30),
  },
  title: {
    ...font(24, 33, 'bold', 'primaryDark', 'left'),
  },
  description: {
    ...font(14, 19, 'medium', 'secondary', 'left'),
    marginTop: rem(16),
  },
});
