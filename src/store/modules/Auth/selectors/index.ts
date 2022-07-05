// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const userDataSelector = (state: RootState) => state.auth.userData;

export const isInitializedSelector = (state: RootState) =>
  state.auth.isInitialized;

export const isWelcomeSeenSelector = (state: RootState) =>
  state.auth.isWelcomeSeen;

export const authTokenSelector = (state: RootState) => state.auth.token;

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.auth.isPhoneNumberVerified;

export const phoneVerificationStepSelector = (state: RootState) =>
  state.auth.phoneVerificationStep;
