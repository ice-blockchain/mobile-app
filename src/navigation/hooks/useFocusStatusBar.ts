// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';

type Props = {
  style: StatusBarStyle;
  backgorund: string;
  animated?: boolean | undefined;
};

export const useFocusStatusBar = ({style, backgorund, animated}: Props) =>
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(backgorund);
      }
    }, [animated, backgorund, style]),
  );
