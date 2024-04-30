// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, KeyboardAvoidingViewProps} from 'react-native';
import {isIOS} from 'rn-units';

type Props = {
  children: ReactNode;
} & KeyboardAvoidingViewProps;

export const KeyboardAvoider = ({children, ...props}: Props) => (
  <KeyboardAvoidingView
    style={commonStyles.flexOne}
    behavior={isIOS ? 'padding' : undefined}
    {...props}>
    {children}
  </KeyboardAvoidingView>
);
