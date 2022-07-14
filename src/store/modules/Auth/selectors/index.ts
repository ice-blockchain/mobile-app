// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const magicUserSelector = (state: RootState) => state.auth.magicUser;

export const userIdSelector = (state: RootState) =>
  state.auth.magicUser!.userId;

export const isAuthorizedSelector = (state: RootState) =>
  !!state.auth.magicUser;

export const isAuthInitializedSelector = (state: RootState) =>
  state.auth.isInitialized;

export const isWelcomeSeenSelector = (state: RootState) =>
  state.auth.isWelcomeSeen;

export const authTokenSelector = (state: RootState) => state.auth.token;

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.auth.isPhoneNumberVerified;

export const phoneVerificationStepSelector = (state: RootState) =>
  state.auth.phoneVerificationStep;

export const profileSelector = (state: RootState) => state.auth.profile;
