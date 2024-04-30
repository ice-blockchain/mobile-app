// SPDX-License-Identifier: ice License 1.0

import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {Divider} from '@screens/AuthFlow/SignIn/components/Divider';
import {SubmitButton} from '@screens/AuthFlow/SignIn/components/SubmitButton';
import {usePhoneAuth} from '@screens/AuthFlow/SignIn/hooks/usePhoneAuth';
import {t} from '@translations/i18n';
import React from 'react';

export const SignInPhoneForm = () => {
  const {
    phoneNumberBody,
    onChangePhone,
    signInWithPhoneNumber,
    isPhoneAuthLoading,
    phoneAuthFailedReason,
  } = usePhoneAuth();

  return (
    <>
      <PhoneNumberInput
        value={phoneNumberBody}
        onChangePhone={onChangePhone}
        errorText={phoneAuthFailedReason}
        editable={!isPhoneAuthLoading}
      />
      <SubmitButton
        text={t('signIn.logInSignUp')}
        onPress={signInWithPhoneNumber}
        loading={isPhoneAuthLoading}
      />
      <Divider label={t('signIn.or')} />
    </>
  );
};
