// SPDX-License-Identifier: ice License 1.0

import notFoundImage from '@screens/ProfileFlow/Profile/assets/images/notFoundBg.png';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const NotFound = () => {
  return (
    <>
      <Image source={notFoundImage} style={styles.notFoundBg} />
      <Text style={styles.notFoundTitle}>{t('profile.not_found.title')}</Text>
      <Text style={styles.notFoundDescription}>
        {t('profile.not_found.description')}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  notFoundBg: {
    alignSelf: 'center',
    width: rem(245),
    height: rem(219),
  },
  notFoundTitle: {
    ...font(24, 30, 'black', 'primaryDark', 'center'),
    marginHorizontal: rem(20),
    marginTop: rem(20),
    marginBottom: rem(16),
  },
  notFoundDescription: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
    marginHorizontal: rem(20),
  },
});
