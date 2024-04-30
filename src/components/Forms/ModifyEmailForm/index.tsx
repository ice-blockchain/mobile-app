// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {UpdateAccountField} from '@components/Forms/components/UpdateAccountField';
import {Note} from '@components/Forms/ModifyEmailForm/components/Note';
import {useModifyEmail} from '@components/Forms/ModifyEmailForm/hooks/useModifyEmail';
import {EmailInput} from '@components/Inputs/EmailInput';
import {t} from '@translations/i18n';
import React from 'react';

export const ModifyEmailForm = () => {
  const {
    email,
    onChangeEmail,
    modifyEmail,
    isModifyEmailLoading,
    modifyEmailFailedReason,
  } = useModifyEmail();

  return (
    <UpdateAccountField
      title={t('confirm_email.modify_title')}
      description={t('confirm_email.modify_description')}
      Input={
        <EmailInput
          value={email}
          onChangeText={onChangeEmail}
          editable={!isModifyEmailLoading}
          errorText={modifyEmailFailedReason}
        />
      }
      Button={
        <PrimaryButton
          text={t('button.continue')}
          onPress={modifyEmail}
          loading={isModifyEmailLoading}
        />
      }
      Note={<Note />}
    />
  );
};
