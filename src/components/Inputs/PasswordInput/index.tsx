// SPDX-License-Identifier: ice License 1.0

import {CommonInput, CommonInputProps} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
import {PasswordIcon} from '@svg/PasswordIcon';
import {t} from '@translations/i18n';
import React from 'react';

export const PasswordInput = (props: Omit<CommonInputProps, 'label'>) => {
  return (
    <CommonInput
      label={t('global.password')}
      icon={<PasswordIcon color={COLORS.secondary} />}
      textContentType={'password'}
      autoComplete={'password'}
      autoCapitalize={'none'}
      autoCorrect={false}
      secureTextEntry={true}
      {...props}
    />
  );
};
