// SPDX-License-Identifier: ice License 1.0

import React, {useState} from 'react';
import {EmitterSubscription, Keyboard} from 'react-native';
import {isIOS} from 'rn-units';

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
