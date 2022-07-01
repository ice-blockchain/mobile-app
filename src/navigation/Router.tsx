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
import {Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

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
  const initializeDynamicLinks = async () => {
    Linking.addEventListener('url', ({url}) => console.log(url));
    Linking.getInitialURL().then(url => {
      if (url) {
        console.log(url);
      }
    });
  };

  useAppStateListener();

  return (
    <NavigationContainer onReady={initializeDynamicLinks} theme={theme}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
