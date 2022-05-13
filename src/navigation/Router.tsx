// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Main from './Main';
// import selectors from '@store/selectors';
import AuthFlow from './Auth';
// import {magicLink} from '@services/magicLink';
// import AuthActions from '@store/modules/Auth/actions';

// type Params = {
//   email: string | null;
// };

function ActiveNavigator() {
  // useEffect(() => {
  //   magicLink.checkUser(AuthActions.STORE_USER_DATA.STATE.create);
  // }, []);
  // const profile = selectors.profile();

  // console.log(user);

  // if (user.email && user.email.length) {
  //   return <Main />;
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
