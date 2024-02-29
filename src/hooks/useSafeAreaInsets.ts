// SPDX-License-Identifier: ice License 1.0

// eslint-disable-next-line no-restricted-imports
import {useSafeAreaInsets as useSafeAreaInsetsOriginal} from 'react-native-safe-area-context';

export function useSafeAreaInsets() {
  return useSafeAreaInsetsOriginal();
}
