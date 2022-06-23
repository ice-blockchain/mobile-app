// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {createSelector} from 'reselect';

const authRootSelector = (state: RootState) => state.auth;

export const isSignUpCompletedSelector = createSelector(
  authRootSelector,
  auth => {
    const {email, phoneNumber} = auth.userData;
    return (
      (!!email &&
        auth.usersInfo[email]?.profileFilled &&
        auth.usersInfo[email]?.welcomeSeen) ||
      (!!phoneNumber &&
        auth.usersInfo[phoneNumber]?.profileFilled &&
        auth.usersInfo[phoneNumber]?.welcomeSeen)
    );
  },
);

export const userDataSelector = (state: RootState) => state.auth.userData;

export const userInfoSelector = (state: RootState) => state.auth.usersInfo;

export const isInitializedSelector = (state: RootState) =>
  state.auth.isInitialized;

export const isSignInSuccessedSelector = (state: RootState) =>
  state.auth.signInSuccessed;

export const isSocialInfoExistsSelector = (state: RootState) =>
  !!state.auth.socialLoginInfo;

export const socialInfoSelector = (state: RootState) =>
  state.auth.socialLoginInfo;
