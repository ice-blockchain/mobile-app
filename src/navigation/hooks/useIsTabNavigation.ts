// SPDX-License-Identifier: ice License 1.0

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

export function useIsTabNavigation() {
  const tabNavigation = useNavigation<BottomTabNavigationProp<{}>>();
  return tabNavigation?.getState?.()?.type === 'tab';
}
