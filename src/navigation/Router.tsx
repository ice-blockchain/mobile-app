// SPDX-License-Identifier: ice License 1.0

import {useRouteNameChange} from '@navigation/hooks/useRouteNameChange';
import {MainNavigator} from '@navigation/Main';
import {theme} from '@navigation/theme';
import {navigationRef} from '@navigation/utils';
import {NavigationContainer} from '@react-navigation/native';
import {routingInstrumentation} from '@services/logging';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {useOpenUrlListener} from '@store/modules/Linking/hooks/useOpenUrlListener';
import {useInitNotifications} from '@store/modules/PushNotifications/hooks/useInitNotifications';
import {useDispatchRestartWalkthrough} from '@store/modules/Walkthrough/hooks/useDispatchRestartWalkthrough';
import React, {useCallback} from 'react';
import RNBootSplash from 'react-native-bootsplash';

function ActiveNavigator() {
  return <MainNavigator />;
}

export function Router() {
  useOpenUrlListener();
  useAppStateListener();
  useInitNotifications();

  const onReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
    RNBootSplash.hide();
  }, []);

  const dispatchRestartWalkthrough = useDispatchRestartWalkthrough();
  const onRouteNameChange = useRouteNameChange({
    onRouteChange: ({newRouteName, prevRouteName}) => {
      AnalyticsEventLogger.trackViewScreen({screenName: newRouteName});
      dispatchRestartWalkthrough({newRouteName, prevRouteName});
    },
  });
  const onStateChange = useCallback(() => {
    onRouteNameChange();
  }, [onRouteNameChange]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
      onReady={onReady}
      onStateChange={onStateChange}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
