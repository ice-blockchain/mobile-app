// SPDX-License-Identifier: ice License 1.0

import {CommonInput, CommonInputProps} from '@components/Inputs/CommonInput';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ClosedEye} from '@svg/ClosedEye';
import {PasswordIcon} from '@svg/PasswordIcon';
import {PrivacyIcon} from '@svg/PrivacyIcon';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {rem} from 'rn-units';

export const PasswordInput = (props: Omit<CommonInputProps, 'label'>) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  return (
    <CommonInput
      label={t('global.password')}
      icon={<PasswordIcon color={COLORS.secondary} />}
      textContentType={'password'}
      autoComplete={'password'}
      autoCapitalize={'none'}
      keyboardType={'default'}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      postfix={
        <Touchable
          onPress={() => setSecureTextEntry(s => !s)}
          hitSlop={SMALL_BUTTON_HIT_SLOP}>
          {secureTextEntry ? (
            <PrivacyIcon
              color={COLORS.secondary}
              width={rem(22)}
              height={rem(14)}
            />
          ) : (
            <ClosedEye
              color={COLORS.secondary}
              width={rem(24)}
              height={rem(24)}
            />
          )}
        </Touchable>
      }
      {...props}
    />
  );
};
