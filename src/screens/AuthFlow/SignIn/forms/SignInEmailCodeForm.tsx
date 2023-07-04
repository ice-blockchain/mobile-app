// SPDX-License-Identifier: ice License 1.0

import {EmailInput} from '@components/Inputs/EmailInput';
import {Divider} from '@screens/AuthFlow/SignIn/components/Divider';
import {SubmitButton} from '@screens/AuthFlow/SignIn/components/SubmitButton';
import {useEmailCodeAuth} from '@screens/AuthFlow/SignIn/hooks/useEmailCodeAuth';
import {t} from '@translations/i18n';
import React from 'react';

export const SignInEmailCodeForm = () => {
  const {
    email,
    setEmail,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
  } = useEmailCodeAuth();

  return (
    <>
      <EmailInput
        value={email}
        onChangeText={setEmail}
        errorText={emailAuthFailedReason}
        editable={!isEmailAuthLoading}
      />
      <SubmitButton
        text={t('signIn.logInSignUp')}
        onPress={signInWithEmail}
        loading={isEmailAuthLoading}
      />
      <Divider label={t('signIn.or')} />
    </>
  );
};
