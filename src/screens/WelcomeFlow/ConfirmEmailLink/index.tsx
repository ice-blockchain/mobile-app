// SPDX-License-Identifier: ice License 1.0

import {ResendButton} from '@components/Buttons/ResendButton';
import {CodeInput} from '@components/Inputs/CodeInput';
import {COLORS} from '@constants/colors';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Description} from '@screens/WelcomeFlow/ConfirmEmailLink/components/Description';
import {WrongEmailButton} from '@screens/WelcomeFlow/ConfirmEmailLink/components/WrongEmailButton';
import {useConfirmEmail} from '@screens/WelcomeFlow/ConfirmEmailLink/hooks/useConfirmEmail';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const ConfirmEmailLink = () => {
  const {
    code,
    email,
    setCode,
    resendCode,
    validationError,
    validateLoading,
    isSuccessValidation,
    emailSentTimestamp,
  } = useConfirmEmail();

  return (
    <FinalizeRegistrationStep
      title={t('confirm_code.title')}
      header={
        <BigHeader
          title={t('confirm_code.title')}
          description={<Description email={email} />}
          progressPercentage={66}
          containerStyle={styles.bigHeader}
        />
      }
      imageSource={require('./assets/images/confirm-email.png')}
      input={
        <CodeInput
          autoFocus={true}
          containerStyle={styles.input}
          value={code}
          setValue={setCode}
          errorText={validationError}
          editable={!validateLoading}
          validated={isSuccessValidation}
          selectionColor={COLORS.shamrock}
        />
      }
      info={
        <ResendButton
          onResend={resendCode}
          containerStyle={styles.resendButton}
          lastSendTimestamp={emailSentTimestamp}
        />
      }
      button={<WrongEmailButton />}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: rem(6),
  },
  bigHeader: {
    marginBottom: rem(50),
  },
  resendButton: {
    marginTop: rem(10),
  },
});
