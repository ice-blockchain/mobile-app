// SPDX-License-Identifier: ice License 1.0

import {InitializationError} from '@navigation/components/InitializationError';
import {useRouteNameChange} from '@navigation/hooks/useRouteNameChange';
import {theme} from '@navigation/theme';
import {navigationReadyResolver, navigationRef} from '@navigation/utils';
import {NavigationContainer} from '@react-navigation/native';
import {MainnetLanding} from '@screens/MainnetLanding';
import {routingInstrumentation} from '@services/logging';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {appInitStateSelector} from '@store/modules/AppCommon/selectors';
import {useOpenUrlListener} from '@store/modules/Linking/hooks/useOpenUrlListener';
import {useInitNotifications} from '@store/modules/PushNotifications/hooks/useInitNotifications';
import {useDispatchRestartWalkthrough} from '@store/modules/Walkthrough/hooks/useDispatchRestartWalkthrough';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

function ActiveNavigator() {
  const appInitState = useSelector(appInitStateSelector);

  useEffect(() => {
    if (appInitState === 'success') {
      navigationReadyResolver();
    }
  }, [appInitState]);

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
  useInitNotifications();

  const onReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
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
