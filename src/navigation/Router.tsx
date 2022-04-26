// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Main from './Main';
// import selectors from '@store/selectors';
import AuthFlow from './Auth';

function ActiveNavigator() {
  // const profile = selectors.profile();

  // if (!profile.profile_filled) {
  //   return <AuthFlow />;
  // }
  return <AuthFlow />;
}

export default function Router() {
  return (
    <NavigationContainer>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
