// SPDX-License-Identifier: ice License 1.0

import {EmailInput} from '@components/Inputs/EmailInput';
import {SubmitButton} from '@screens/AuthFlow/SignIn/components/SubmitButton';
import {useCustomEmailAuth} from '@screens/AuthFlow/SignIn/hooks/useCustomEmailAuth';
import {t} from '@translations/i18n';
import React from 'react';

export const SignInEmailCustomForm = () => {
  const {
    email,
    setEmail,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
  } = useCustomEmailAuth();

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
    </>
  );
};
