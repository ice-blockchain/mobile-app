// SPDX-License-Identifier: ice License 1.0

import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleSheet,
} from 'react-native';

type Props = {
  children: ReactNode;
} & KeyboardAvoidingViewProps;

export const KeyboardAvoider = ({children, ...props}: Props) => (
  <KeyboardAvoidingView style={styles.flex} behavior={'padding'} {...props}>
    {children}
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  flex: {flex: 1},
});
