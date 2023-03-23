// SPDX-License-Identifier: ice License 1.0

import {EmailInput} from '@components/Inputs/EmailInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {useSetEmail} from '@screens/WelcomeFlow/SetEmail/hooks/useSetEmail';
import {t} from '@translations/i18n';
import React from 'react';

export const SetEmail = () => {
  const {
    email,
    onChangeEmail,
    updateError,
    updateLoading,
    onSubmitPress,
    onBack,
  } = useSetEmail();

  return (
    <FinalizeRegistrationStep
      title={t('confirm_email.title')}
      showBackButton={true}
      onBackPress={onBack}
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
      info={<Info text={t('confirm_email.note', {value: 5})} />}
      button={
        <PrimaryButton
          text={t('button.complete')}
          onPress={onSubmitPress}
          loading={updateLoading}
          disabled={email.trim() === ''}
        />
      }
    />
  );
};
