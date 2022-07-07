// SPDX-License-Identifier: BUSL-1.1

import {Initialization} from '@components/Initialization';
import {theme} from '@navigation/theme';
import {NavigationContainer} from '@react-navigation/native';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {
  isInitializedSelector,
  isWelcomeSeenSelector,
  userDataSelector,
} from '@store/modules/Auth/selectors';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

/**
 * We don't use state persistence or deep links to the screen which accepts functions in params,
 * so the warning doesn't affect us and we can safely ignore it
 * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
 */
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import {AuthNavigator} from './Auth';
import {Main} from './Main';

function ActiveNavigator() {
  const dispatch = useDispatch();
  const isInitialized = useSelector(isInitializedSelector);
  const isWelcomeSeen = useSelector(isWelcomeSeenSelector);
  const userData = useSelector(userDataSelector);

  useEffect(() => {
    dispatch(AppCommonActions.APP_LOADED.STATE.create());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialized) {
    return <Initialization />;
  }
  if (userData && isWelcomeSeen) {
    return <Main />;
  }
  return <AuthNavigator />;
}

export function Router() {
  useAppStateListener();
  return (
    <NavigationContainer theme={theme}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
