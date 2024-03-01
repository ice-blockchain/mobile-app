// SPDX-License-Identifier: ice License 1.0

import {InitializationError} from '@navigation/components/InitializationError';
import {theme} from '@navigation/theme';
import {NavigationContainer} from '@react-navigation/native';
import {MainnetLanding} from '@screens/MainnetLanding';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {appInitStateSelector} from '@store/modules/AppCommon/selectors';
import {useOpenUrlListener} from '@store/modules/Linking/hooks/useOpenUrlListener';
import {useSubscribeToPushNotifications} from '@store/modules/PushNotifications/hooks/useSubscribeToPushNotifications';
import React from 'react';
import {useSelector} from 'react-redux';

function ActiveNavigator() {
  const appInitState = useSelector(appInitStateSelector);

  if (appInitState === 'loading') {
    return null;
  }

  if (appInitState === 'error') {
    return <InitializationError />;
  }

  return <MainnetLanding />;
}

export function Router() {
  useOpenUrlListener();
  useAppStateListener();
  useSubscribeToPushNotifications();
  return (
    <NavigationContainer theme={theme}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
