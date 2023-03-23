// SPDX-License-Identifier: ice License 1.0

import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleSheet,
} from 'react-native';
import {isIOS} from 'rn-units';

type Props = {
  children: ReactNode;
} & KeyboardAvoidingViewProps;

export const KeyboardAvoider = ({children, ...props}: Props) => (
  <KeyboardAvoidingView
    style={styles.flex}
    behavior={isIOS ? 'padding' : undefined}
    {...props}>
    {children}
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  flex: {flex: 1},
});
