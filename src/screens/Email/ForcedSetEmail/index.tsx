// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {EmailInput} from '@components/Inputs/EmailInput';
import {useSetEmail} from '@screens/Email/ForcedSetEmail/hooks/useSetEmail';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {t} from '@translations/i18n';
import React from 'react';

export const ForcedSetEmail = () => {
  const {email, onChangeEmail, updateError, updateLoading, onSubmitPress} =
    useSetEmail();

  return (
    <FinalizeRegistrationStep
      title={t('confirm_email.title')}
      showBackButton={false}
      header={
        <BigHeader
          title={t('confirm_email.title')}
          description={t('confirm_email.description')}
          progressPercentage={95}
        />
      }
      imageSource={require('./assets/images/set-email.png')}
      input={
        <EmailInput
          onChangeText={onChangeEmail}
          value={email}
          errorText={updateError}
        />
      }
      info={<Info text={t('confirm_email.note')} />}
      button={
        <PrimaryButton
          text={t('button.continue')}
          onPress={onSubmitPress}
          loading={updateLoading}
          disabled={email.trim() === ''}
        />
      }
    />
  );
};
