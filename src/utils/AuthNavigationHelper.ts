// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {useSelector} from 'react-redux';

// import store from '@store';

export const AuthNavigationHelper = () => {
  // const { token, profile } = store.getState().auth;
  const email = useSelector((state: RootState) => state.auth.userData.email);
  const phoneNumber = useSelector(
    (state: RootState) => state.auth.userData.phoneNumber,
  );
  const usersInfo = useSelector((state: RootState) => state.auth.usersInfo);
  // const token = ''; //TODO: get from store
  // const profile = {}; //TODO: get from store
  if (email) {
    if (!usersInfo[email]?.profileFilled) {
      return 'ClaimNickname';
    }
    if (!usersInfo[email]?.welcomeSeen) {
      return 'Welcome';
    }
  }

  if (phoneNumber) {
    if (!usersInfo[phoneNumber]?.profileFilled) {
      return 'ClaimNickname';
    }
    if (!usersInfo[phoneNumber]?.welcomeSeen) {
      return 'Welcome';
    }
  }

  return 'SignIn';
};
