import React from 'react';
import {AppState} from 'react-native';
import {isAppActive} from 'src/utils/helpers';

export default function AppLaunchListener() {
  const handleAppStateChanged = async () => {
    const active = isAppActive();
    if (!active) {
      // handle app went background
      return;
    }
    // handle app became active
  };

  React.useEffect(() => {
    AppState.addEventListener('change', handleAppStateChanged);
    return () => {
      AppState.removeListener('change', handleAppStateChanged);
    };
  }, []);

  return null;
}
