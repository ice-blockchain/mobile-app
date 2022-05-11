// SPDX-License-Identifier: BUSL-1.1

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Main from './Main';
// import selectors from '@store/selectors';
import AuthFlow from './Auth';

import {checkUser} from '@services/magicLink';

function ActiveNavigator() {
  // const profile = selectors.profile();

  // if (!profile.profile_filled) {
  //   return <AuthFlow />;
  // }
  return <AuthFlow />;
}

export default function Router() {
  const [user, setUser] = useState<{
    isLoggedIn: boolean;
    email: string | null;
  }>({
    isLoggedIn: false,
    email: '',
  });
  useEffect(() => {
    const validateUser = async () => {
      try {
        await checkUser(setUser);
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [user.isLoggedIn]);
  return (
    <NavigationContainer>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
