// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {
  EmitterSubscription,
  Keyboard,
  Platform,
  StatusBar,
  StatusBarStyle,
} from 'react-native';

type Props = {
  style: StatusBarStyle;
  animated?: boolean | undefined;
};

export const useFocusStatusBar = ({style, animated}: Props) =>
  useFocusEffect(
    useCallback(() => {
      let subscription: EmitterSubscription;
      if (Platform.OS === 'ios') {
        // the status-bar changes color to default on iOS when the keyboard is shown
        subscription = Keyboard.addListener('keyboardWillShow', () => {
          StatusBar.setBarStyle(style, animated);
        });
      }

      StatusBar.setBarStyle(style, animated);
      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    }, [animated, style]),
  );
