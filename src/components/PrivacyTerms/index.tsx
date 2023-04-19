// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

export const PrivacyTerms = ({containerStyle}: Props) => {
  const handlePress = (url: string) => () => {
    openLinkWithInAppBrowser({url});
  };

  return (
    <View style={[styles.container, containerStyle]}>
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
    ...font(12, 14.4, 'regular', 'primaryDark', 'center'),
    marginHorizontal: rem(40),
  },
  link: {
    ...font(12, 14.4, 'regular', 'primaryLight'),
  },
});
