// SPDX-License-Identifier: BUSL-1.1

import {magicLink} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {
  getInitSelector,
  isSignUpCompletedSelector,
  userDataSelector,
} from '@store/modules/Auth/selectors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useMagicAuth = () => {
  const dispatch = useDispatch();
  const initialization = useSelector(getInitSelector);
  const usersData = useSelector(userDataSelector);
  const isSignUpCompleted = useSelector(isSignUpCompletedSelector);

  const getUserData = async () => {
    const isLoggedIn = await magicLink.checkUser();

    if (isLoggedIn) {
      dispatch(
        AuthActions.STORE_USER_DATA.STATE.create({
          email: usersData.email ? usersData.email.toLowerCase() : null,
          phoneNumber: usersData.phoneNumber,
        }),
      );
    } else {
      dispatch(
        AuthActions.STORE_USER_DATA.STATE.create({
          email: null,
          phoneNumber: null,
        }),
      );
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [initialization, isSignUpCompleted];
};
