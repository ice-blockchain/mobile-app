// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {UpdateAccountField} from '@components/Forms/components/UpdateAccountField';
import {useModifyPhoneNumber} from '@components/Forms/ModifyPhoneNumberForm/hooks/useModifyPhoneNumber';
import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {Country} from '@constants/countries';
import {useResendCountdown} from '@hooks/useResendCountdown';
import {t} from '@translations/i18n';
import React, {RefObject} from 'react';
import {View} from 'react-native';

type Props = {
  initialPhoneNumber?: string | null;
  selectedCountry?: Country | null;
  phoneInputRef?: RefObject<View>;
  onPhoneInputLayout?: () => void;
};

export const ModifyPhoneNumberForm = ({
  initialPhoneNumber,
  selectedCountry,
  phoneInputRef,
  onPhoneInputLayout,
}: Props) => {
  const {
    phoneNumberBody,
    onChangePhone,
    modifyPhoneNumber,
    isModifyPhoneLoading,
    modifyPhoneFailedReason,
    smsSentTimestamp,
  } = useModifyPhoneNumber({
    initialPhoneNumber,
    selectedCountry,
  });
  const {resendAvailable} = useResendCountdown({
    lastSendTimestamp: smsSentTimestamp,
  });

  return (
    <UpdateAccountField
      title={t('confirm_phone.modify_title')}
      description={t('confirm_phone.modify_description')}
      Input={
        <View ref={phoneInputRef} onLayout={onPhoneInputLayout}>
          <PhoneNumberInput
            selectedCountry={selectedCountry}
            value={phoneNumberBody}
            onChangePhone={onChangePhone}
            editable={!isModifyPhoneLoading}
            errorText={modifyPhoneFailedReason}
          />
        </View>
      }
      Button={
        <PrimaryButton
          text={t('confirm_phone.button')}
          onPress={modifyPhoneNumber}
          loading={isModifyPhoneLoading}
          disabled={!resendAvailable || phoneNumberBody.trim() === ''}
        />
      }
    />
  );
};
