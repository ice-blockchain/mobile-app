// SPDX-License-Identifier: ice License 1.0

import {
  socialKycAttemptsSelector,
  socialKycStatusSelector,
} from '@store/modules/SocialKyc/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export function Details() {
  const socialKycStatus = useSelector(socialKycStatusSelector);
  const socialKycAttempts = useSelector(socialKycAttemptsSelector);

  if (socialKycStatus === 'SUCCESS') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {t('social_kyc.results_step.success.title')}
        </Text>
        <Text style={styles.text}>
          {t('social_kyc.results_step.success.description')}
        </Text>
      </View>
    );
  }

  const canTryAgain = !!socialKycAttempts;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {canTryAgain
          ? t('social_kyc.results_step.error_try_again.title')
          : t('social_kyc.results_step.error_try_later.title')}
      </Text>
      <Text style={styles.text}>
        {canTryAgain
          ? t('social_kyc.results_step.error_try_again.description')
          : t('social_kyc.results_step.error_try_later.description')}
      </Text>
      <Text style={styles.attemptsLeft}>
        {t('social_kyc.results_step.attempts_left', {count: socialKycAttempts})}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(52),
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
  attemptsLeft: {
    flex: 1,
    paddingTop: rem(60),
    ...font(16, 22, 'semibold', 'primaryLight', 'center'),
  },
});
