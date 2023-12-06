// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export function Confirmation() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('social_kyc.verification_step.title')}
      </Text>
      <Text style={styles.text}>
        {t('social_kyc.verification_step.description')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(48),
  },
  title: {
    flex: 1,
    ...font(24, 32, 'black', 'primaryDark', 'center'),
  },
  text: {
    flex: 1,
    paddingTop: rem(20),
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
});
