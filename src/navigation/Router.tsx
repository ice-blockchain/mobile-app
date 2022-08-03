// SPDX-License-Identifier: BUSL-1.1

import {Initialization} from '@components/Initialization';
import {theme} from '@navigation/theme';
import {NavigationContainer} from '@react-navigation/native';
import {useAppLoadedDispatcher} from '@store/modules/AppCommon/hooks/useAppLoadedDispatcher';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {isAppInitializedSelector} from '@store/modules/AppCommon/selectors';
import {
  isWelcomeSeenSelector,
  userSelector,
} from '@store/modules/Auth/selectors';
import React from 'react';
import {LogBox} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';

/**
 * We don't use state persistence or deep links to the screen which accepts functions in params,
 * so the warning doesn't affect us and we can safely ignore it
 * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
 */
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import {AuthNavigator} from './Auth';
import {MainNavigator} from './Main';

function ActiveNavigator() {
  const isAppInitialized = useSelector(isAppInitializedSelector);
  const isWelcomeSeen = useSelector(isWelcomeSeenSelector);
  const user = useSelector(userSelector);

  if (!isAppInitialized) {
    return <Initialization />;
  }
  if (user && isWelcomeSeen) {
    return <MainNavigator />;
  }
  return <AuthNavigator />;
}

export function Router() {
  useAppLoadedDispatcher();
  useAppStateListener();
  return (
    <NavigationContainer theme={theme} onReady={RNBootSplash.hide}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
