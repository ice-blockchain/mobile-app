// SPDX-License-Identifier: BUSL-1.1

import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from './Main';
// import selectors from '@store/selectors';
import {AuthNavigator} from './Auth';
import {magicLink} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Initialization} from '@screens/AuthFlow/Initialization';
import {RootState} from '@store/rootReducer';
import {isSignUpCompletedSelector} from '@store/modules/Auth/selectors';

function ActiveNavigator() {
  const dispatch = useDispatch();
  const initialization = useSelector(
    (state: RootState) => state.auth.initialization,
  );
  const isSignUpCompleted = useSelector(isSignUpCompletedSelector);
  useEffect(() => {
    const getUserData = async () => {
      const {email, phoneNumber} = await magicLink.checkUser();
      dispatch(
        AuthActions.STORE_USER_DATA.STATE.create({
          email: email ? email.toLowerCase() : null,
          phoneNumber,
        }),
      );
    };
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const profile = selectors.profile();

  // console.log(user);
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
    <NavigationContainer onReady={initializeDynamicLinks}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
