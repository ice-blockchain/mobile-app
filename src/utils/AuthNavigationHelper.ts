// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {useSelector} from 'react-redux';

// import store from '@store';

export default () => {
  // const { token, profile } = store.getState().auth;
  const email = useSelector((state: RootState) => state.auth.userData.email);
  const usersInfo = useSelector((state: RootState) => state.auth.usersInfo);
  // const token = ''; //TODO: get from store
  // const profile = {}; //TODO: get from store
  if (!email) {
    return 'SignIn';
  }
  if (!usersInfo[email]?.profileFilled) {
    return 'ClaimNickname';
  }
  if (!usersInfo[email]?.welcomeSeen) {
    return 'Welcome';
  }

  return 'SignIn';

  // let initialScreen = 'Intro';

  // if (token) {
  //   initialScreen = 'CheckEmail';
  // }

  // if (profile?.email) {
  //   initialScreen = 'ClaimNickname';
  // } else {
  //   initialScreen = 'SignIn';
  // }

  // return 'SignIn';
};
