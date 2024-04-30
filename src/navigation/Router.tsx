// SPDX-License-Identifier: ice License 1.0

import {AuthNavigator} from '@navigation/Auth';
import {InitializationError} from '@navigation/components/InitializationError';
import {useRouteNameChange} from '@navigation/hooks/useRouteNameChange';
import {MainNavigator} from '@navigation/Main';
import {theme} from '@navigation/theme';
import {navigationReadyResolver, navigationRef} from '@navigation/utils';
import {WelcomeNavigator} from '@navigation/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import {routingInstrumentation} from '@services/logging';
import {
  isRegistrationCompleteSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {appInitStateSelector} from '@store/modules/AppCommon/selectors';
import {useOpenUrlListener} from '@store/modules/Linking/hooks/useOpenUrlListener';
import {useInitNotifications} from '@store/modules/PushNotifications/hooks/useInitNotifications';
import {useDispatchRestartWalkthrough} from '@store/modules/Walkthrough/hooks/useDispatchRestartWalkthrough';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

function ActiveNavigator() {
  const user = useSelector(userSelector);
  const isRegistrationComplete = useSelector(isRegistrationCompleteSelector);
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

  if (!user) {
    return <AuthNavigator />;
  }

  if (!isRegistrationComplete) {
    return <WelcomeNavigator />;
  }

  return <MainNavigator />;
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
