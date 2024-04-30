// SPDX-License-Identifier: ice License 1.0

import {CommonInput, CommonInputProps} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
import {EmailIcon} from '@svg/EmailIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {rem} from 'rn-units';

export const EmailInput = (props: Omit<CommonInputProps, 'label'>) => {
  return (
    <CommonInput
      label={t('global.email_address')}
      icon={<EmailIcon width={rem(24)} color={COLORS.secondary} />}
      keyboardType={'email-address'}
      textContentType={'emailAddress'}
      autoComplete={'email'}
      autoCapitalize={'none'}
      autoCorrect={true}
      {...props}
    />
  );
};
