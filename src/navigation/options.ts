// SPDX-License-Identifier: ice License 1.0

import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const tabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  lazy: true,
  tabBarHideOnKeyboard: true,
};

export const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
};

export const modalOptions: NativeStackNavigationOptions = {
  presentation: 'containedTransparentModal',
  animation: 'fade',
} as const;
