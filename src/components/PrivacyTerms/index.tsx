// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const PrivacyTerms = () => {
  const handlePress = (url: string) => () => {
    openLinkWithInAppBrowser({url});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {t('signIn.privacy.description')}
        <Text style={styles.link} onPress={handlePress(LINKS.TERMS)}>
          {t('signIn.privacy.terms')}
        </Text>
        <Text>{t('signIn.privacy.and')} </Text>
        <Text style={styles.link} onPress={handlePress(LINKS.PRIVACY)}>
          {t('signIn.privacy.policy')}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font(12, 14.4, 'regular', 'primaryDark'),
    marginHorizontal: rem(40),
    textAlign: 'center',
  },
  link: {
    ...font(12, 14.4, 'regular', 'primaryLight'),
  },
});
