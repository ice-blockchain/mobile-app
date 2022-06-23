// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';

type Props = {
  style: StatusBarStyle;
  animated?: boolean | undefined;
};

export const useFocusStatusBar = ({style, animated}: Props) =>
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated);
    }, [animated, style]),
  );
