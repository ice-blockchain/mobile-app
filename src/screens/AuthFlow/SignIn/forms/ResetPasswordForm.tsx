// SPDX-License-Identifier: ice License 1.0

import {EmailInput} from '@components/Inputs/EmailInput';
import {SubmitButton} from '@screens/AuthFlow/SignIn/components/SubmitButton';
import {useResetPassword} from '@screens/AuthFlow/SignIn/hooks/useResetPassword';
import {t} from '@translations/i18n';
import React from 'react';

export const ResetPasswordForm = () => {
  const {
    email,
    setEmail,
    resetPassword,
    isResetPasswordLoading,
    resetPasswordFailedReason,
  } = useResetPassword();

  return (
    <>
      <EmailInput
        value={email}
        onChangeText={setEmail}
        errorText={resetPasswordFailedReason}
        editable={!isResetPasswordLoading}
      />
      <SubmitButton
        text={t('signIn.reset_password')}
        onPress={resetPassword}
        loading={isResetPasswordLoading}
      />
    </>
  );
};
