// SPDX-License-Identifier: ice License 1.0

import {ResendButton} from '@components/Buttons/ResendButton';
import {ConfirmCode} from '@components/Forms/components/ConfirmCode';
import {ConfirmCodeBack} from '@components/Forms/components/ConfirmCode/components/ConfirmCodeBack';
import {useConfirmPhoneNumber} from '@components/Forms/ConfirmPhoneNumberForm/hooks/useConfirmPhoneNumber';
import {CodeInput} from '@components/Inputs/CodeInput';
import {COLORS} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {t} from '@translations/i18n';
import {formatPhoneNumber} from '@utils/phoneNumber';
import React from 'react';
import {StyleSheet} from 'react-native';

type Props = {
  onDoThisLater?: () => void;
  onModifyPhoneNumber?: () => void;
};

export const ConfirmPhoneNumberForm = ({
  onDoThisLater,
  onModifyPhoneNumber,
}: Props) => {
  const navigation = useNavigation();
  const {
    code,
    phoneNumber,
    setCode,
    resendCode,
    validationError,
    validateLoading,
    isSuccessValidation,
    smsSentTimestamp,
    clearError,
  } = useConfirmPhoneNumber({onModifyPhoneNumber});

  return (
    <ConfirmCode
      codeSource={formatPhoneNumber(phoneNumber ?? '')}
      CodeInput={
        <CodeInput
          autoFocus={true}
          value={code}
          setValue={setCode}
          errorText={validationError}
          editable={!validateLoading}
          validated={isSuccessValidation}
        />
      }
      ResendButton={
        <ResendButton
          onResend={resendCode}
          lastSendTimestamp={smsSentTimestamp}
        />
      }
      BackButton={
        <ConfirmCodeBack
          onPress={() => {
            if (onModifyPhoneNumber) {
              clearError();
              onModifyPhoneNumber();
            } else {
              navigation.goBack();
            }
          }}
          text={t('confirm_code.wrong_number')}
        />
      }
      DoThisLaterButton={
        onDoThisLater ? (
          <ConfirmCodeBack
            onPress={onDoThisLater}
            text={t('button.do_this_later')}
            textStyle={styles.doThisLaterText}
          />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  doThisLaterText: {color: COLORS.attention},
});
