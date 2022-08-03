// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const magicUserSelector = (state: RootState) => state.auth.magicUser;

export const userIdSelector = (state: RootState) =>
  state.auth.magicUser!.userId;

export const isAuthorizedSelector = (state: RootState) =>
  !!state.auth.magicUser;

export const isAuthInitializedSelector = (state: RootState) =>
  state.auth.isInitialized;

export const userPhoneNumberSelector = (state: RootState) =>
  state.auth.magicUser!.phoneNumber;

export const isWelcomeSeenSelector = (state: RootState) =>
  state.auth.isWelcomeSeen;

export const authTokenSelector = (state: RootState) => state.auth.token;

export const userSelector = (state: RootState) => state.auth.user;

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.auth.user?.phoneNumber;
