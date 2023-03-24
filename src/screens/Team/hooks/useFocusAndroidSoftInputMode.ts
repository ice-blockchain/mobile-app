// SPDX-License-Identifier: ice License 1.0

import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {setAdjustPan, setAdjustResize} from 'rn-android-keyboard-adjust';

/**
 * Setting android:windowSoftInputMode to adjustPan
 * to make focusing search input transition smooth
 */
export const useFocusAndroidSoftInputMode = () => {
  useFocusEffect(
    useCallback(() => {
      setAdjustPan();
      return () => setAdjustResize();
    }, []),
  );
};
