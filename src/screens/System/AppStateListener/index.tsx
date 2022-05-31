// SPDX-License-Identifier: BUSL-1.1

import {isAppActive} from '@utils/application';
import React from 'react';
import {AppState} from 'react-native';

export function AppStateListener() {
  const handleAppStateChanged = async () => {
    const active = isAppActive();
    if (!active) {
      // handle app went background
      return;
    }
    // handle app became active
  };

  React.useEffect(() => {
    const stateListener = AppState.addEventListener(
      'change',
      handleAppStateChanged,
    );
    return () => {
      stateListener.remove();
    };
  }, []);

  return null;
}
