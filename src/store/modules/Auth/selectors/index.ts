// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {createSelector} from 'reselect';

const authRootSelector = (state: RootState) => state.auth;

export const isSignUpCompletedSelector = createSelector(
  authRootSelector,
  auth => {
    const {email} = auth.userData;
    return (
      !!email &&
      auth.usersInfo[email].profileFilled &&
      auth.usersInfo[email].welcomeSeen
    );
  },
);
