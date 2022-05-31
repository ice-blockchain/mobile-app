// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {useSelector} from 'react-redux';

export const useInitialRouteName = () => {
  const email = useSelector((state: RootState) => state.auth.userData.email);
  const phoneNumber = useSelector(
    (state: RootState) => state.auth.userData.phoneNumber,
  );
  const usersInfo = useSelector((state: RootState) => state.auth.usersInfo);
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
