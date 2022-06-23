// SPDX-License-Identifier: BUSL-1.1

import {Initialization} from '@components/Initialization';
import {theme} from '@navigation/theme';
import {NavigationContainer} from '@react-navigation/native';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {
  isInitializedSelector,
  isSignUpCompletedSelector,
} from '@store/modules/Auth/selectors';
import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AuthNavigator} from './Auth';
import {Main} from './Main';

function ActiveNavigator() {
  const dispatch = useDispatch();
  const initialization = useSelector(isInitializedSelector);
  const isSignUpCompleted = useSelector(isSignUpCompletedSelector);

  useEffect(() => {
    dispatch(AppCommonActions.APP_LOADED.STATE.create());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
