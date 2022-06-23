// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const isSignUpCompletedSelector = (state: RootState) => {
  const {email, phoneNumber} = state.auth.userData;
  return (
    (!!email &&
      state.auth.usersInfo[email]?.profileFilled &&
      state.auth.usersInfo[email]?.welcomeSeen) ||
    (!!phoneNumber &&
      state.auth.usersInfo[phoneNumber]?.profileFilled &&
      state.auth.usersInfo[phoneNumber]?.welcomeSeen)
  );
};

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
