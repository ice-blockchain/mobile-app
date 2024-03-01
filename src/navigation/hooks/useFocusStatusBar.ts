// SPDX-License-Identifier: ice License 1.0

import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {Keyboard, StatusBar, StatusBarStyle} from 'react-native';
import {isAndroid, isIOS} from 'rn-units';

type Props = {
  style: StatusBarStyle;
  animated?: boolean | undefined;
};

export const useFocusStatusBar = ({style, animated}: Props) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated);

      if (isAndroid) {
        StatusBar.setBackgroundColor('transparent', animated);
        StatusBar.setTranslucent(true);
      }

      if (isIOS) {
        // the status-bar changes color to default on iOS when the keyboard is shown
        const subscription = Keyboard.addListener('keyboardWillShow', () => {
          StatusBar.setBarStyle(style, animated);
        });

        return () => {
          subscription.remove();
        };
      }
    }, [animated, style]),
  );
};
