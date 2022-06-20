// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';

type Props = {
  style: StatusBarStyle;
  background: string;
  animated?: boolean | undefined;
};

export const useFocusStatusBar = ({style, background, animated}: Props) =>
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(background);
      }
    }, [animated, background, style]),
  );
