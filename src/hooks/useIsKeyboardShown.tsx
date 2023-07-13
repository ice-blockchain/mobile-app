// SPDX-License-Identifier: ice License 1.0

import React, {useState} from 'react';
import {EmitterSubscription, Keyboard} from 'react-native';
import {isIOS} from 'rn-units';

/**
 * Custom hook borrowed from https://github.com/react-navigation/react-navigation/blob/main/packages/bottom-tabs/src/utils/useIsKeyboardShown.tsx
 * @returns {boolean} isKeyboardShown
 */
export default function useIsKeyboardShown() {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  React.useEffect(() => {
    const handleKeyboardShow = () => setIsKeyboardShown(true);

    const handleKeyboardHide = () => setIsKeyboardShown(false);

    let subscriptions: EmitterSubscription[];

    if (isIOS) {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardHide),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidShow', handleKeyboardShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardHide),
      ];
    }

    return () => {
      subscriptions.forEach(s => s.remove());
    };
  }, []);

  return isKeyboardShown;
}
