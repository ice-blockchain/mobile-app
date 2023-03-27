// SPDX-License-Identifier: ice License 1.0

import {EmailInput} from '@components/Inputs/EmailInput';
import {PasswordInput} from '@components/Inputs/PasswordInput';
import {Divider} from '@screens/AuthFlow/SignIn/components/Divider';
import {SubmitButton} from '@screens/AuthFlow/SignIn/components/SubmitButton';
import {useEmailPasswordAuth} from '@screens/AuthFlow/SignIn/hooks/useEmailPasswordAuth';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onResetPasswordPress: () => void;
};

export const SignInEmailPasswordForm = ({onResetPasswordPress}: Props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
    failedField,
  } = useEmailPasswordAuth();

  return (
    <>
      <EmailInput
        value={email}
        onChangeText={setEmail}
        errorText={failedField === 'email' ? emailAuthFailedReason : ''}
        editable={!isEmailAuthLoading}
      />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        errorText={failedField === 'password' ? emailAuthFailedReason : ''}
        editable={!isEmailAuthLoading}
        containerStyle={styles.passwordInput}
      />
      <SubmitButton
        text={t('signIn.logInSignUp')}
        onPress={signInWithEmail}
        loading={isEmailAuthLoading}
      />
      <Divider
        label={t('signIn.reset_password')}
        textStyle={styles.resetPasswordText}
        onPress={onResetPasswordPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  passwordInput: {
    marginTop: rem(10),
  },
  resetPasswordText: {
    ...font(12, 14.4, 'regular', 'primaryDark'),
  },
});
