// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import teamEmptyImage from '@screens/Team/assets/images/teamEmpty.png';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export function EmptyContacts() {
  return (
    <View style={styles.container}>
      <Image
        source={teamEmptyImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        <Text>{t('team.empty.contacts')}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: rem(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: rem(200),
    height: rem(170),
  },
  title: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(16),
    ...font(14, 24, 'regular', 'primaryDark', 'center'),
  },
});
