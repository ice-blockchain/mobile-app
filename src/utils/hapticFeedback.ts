// SPDX-License-Identifier: BUSL-1.1

import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

export function hapticFeedback(type: HapticFeedbackTypes = 'soft') {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  ReactNativeHapticFeedback.trigger(type, options);
}
