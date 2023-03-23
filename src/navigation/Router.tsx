// SPDX-License-Identifier: ice License 1.0

import {InitializationError} from '@components/InitializationError';
import {AuthNavigator} from '@navigation/Auth';
import {useRouteNameChange} from '@navigation/hooks/useRouteNameChange';
import {MainNavigator} from '@navigation/Main';
import {theme} from '@navigation/theme';
import {navigationReadyResolver, navigationRef} from '@navigation/utils';
import {WelcomeNavigator} from '@navigation/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import {routingInstrumentation} from '@services/logging';
import {useUserChangedListener} from '@store/modules/Account/hooks/useUserChangedListener';
import {
  isRegistrationCompleteSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {ActiveTabActions} from '@store/modules/ActiveTab/actions';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {useAppLoadedListener} from '@store/modules/AppCommon/hooks/useAppLoadedListener';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {appInitStateSelector} from '@store/modules/AppCommon/selectors';
import {useOpenUrlListener} from '@store/modules/Linking/hooks/useOpenUrlListener';
import {useInitNotifications} from '@store/modules/PushNotifications/hooks/useInitNotifications';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import React, {useCallback, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useDispatch, useSelector} from 'react-redux';

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
  useAppLoadedListener();
  useAppStateListener();
  useUserChangedListener();
  useInitNotifications();

  const onReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
    RNBootSplash.hide();
  }, []);

  const dispatch = useDispatch();
  const onRouteNameChange = useRouteNameChange({
    onRouteChange: screenName => {
      AnalyticsEventLogger.trackViewScreen({screenName});
      dispatch(ActiveTabActions.SET_CURRENT_SCREEN.STATE.create(screenName));
      if (screenName !== 'Walkthrough' && screenName !== 'PopUp') {
        dispatch(WalkthroughActions.RESTART_WALKTHROUGH.STATE.create());
      }
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
