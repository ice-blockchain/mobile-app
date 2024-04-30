// SPDX-License-Identifier: ice License 1.0

import {BackButton} from '@components/Buttons/BackButton';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/AuthFlow/InvalidLink/components/Header';
import {useBackHandler} from '@screens/AuthFlow/InvalidLink/hooks/useBackHandler';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const InvalidLink = () => {
  useFocusStatusBar({style: 'light-content'});
  const {goBack} = useBackHandler();

  return (
    <View style={styles.container}>
      <Header />
      <BackButton onPress={goBack} />
      <Text style={styles.descriptionText}>
        {t('invalid_link.description')}
      </Text>
      <PrimaryButton
        onPress={goBack}
        text={t('button.back_to_login')}
        style={styles.backToLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionText: {
    marginTop: rem(24),
    marginHorizontal: rem(42),
    ...font(16, 26, 'medium', 'secondary', 'center'),
  },
  backToLogin: {
    width: rem(210),
    alignSelf: 'center',
    marginTop: rem(26),
  },
});
