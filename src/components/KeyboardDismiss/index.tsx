// SPDX-License-Identifier: ice License 1.0

import React, {ReactNode} from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = {
  children: ReactNode;
  onDismiss?: () => void;
};

export const KeyboardDismiss = ({children, onDismiss}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        onDismiss?.();
      }}
      accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export const stopPropagation = {
  onStartShouldSetResponder: (_: GestureResponderEvent) => true,
  onTouchEnd: (e: GestureResponderEvent) => e.stopPropagation(),
};
