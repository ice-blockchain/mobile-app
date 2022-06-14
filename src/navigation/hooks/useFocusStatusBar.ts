// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';

export const useFocusStatusBar = (
  style: StatusBarStyle,
  animated?: boolean | undefined,
) =>
  useFocusEffect(
    useCallback(
      () => StatusBar.setBarStyle(style, animated),
      [animated, style],
    ),
  );
