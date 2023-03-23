// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/PrimaryButton';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  loading: boolean;
};

export const SubmitButton = ({onPress, loading}: Props) => {
  return (
    <PrimaryButton
      text={t('signIn.logInSignUp')}
      onPress={onPress}
      style={[styles.button]}
      loading={loading}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: rem(24),
    height: rem(52),
    alignSelf: 'center',
    paddingHorizontal: rem(54),
  },
});
