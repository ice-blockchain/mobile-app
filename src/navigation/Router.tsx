// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Main';
// import selectors from 'src/store/selectors';
// import AuthFlow from './AuthFlow';

function ActiveNavigator() {
  // const profile = selectors.profile();

  // if (!profile.profile_filled) {
  //   return <AuthFlow />;
  // }
  return <Main />;
}

export default function Router() {
  return (
    <NavigationContainer>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
