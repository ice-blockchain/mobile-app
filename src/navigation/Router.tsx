// SPDX-License-Identifier: BUSL-1.1

import {Initialization} from '@components/Initialization';
import {useMagicAuth} from '@navigation/hooks/useMagicAuth';
import {theme} from '@navigation/theme';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Linking} from 'react-native';

// import selectors from '@store/selectors';
import {AuthNavigator} from './Auth';
import {Main} from './Main';

function ActiveNavigator() {
  const [initialization, isSignUpCompleted] = useMagicAuth();

  if (initialization) {
    return <Initialization />;
  }
  if (isSignUpCompleted) {
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

  return (
    <NavigationContainer onReady={initializeDynamicLinks} theme={theme}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
