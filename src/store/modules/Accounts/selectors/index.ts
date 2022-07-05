// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.account.isPhoneNumberVerified;

export const phoneVerificationStepSelector = (state: RootState) =>
  state.account.phoneVerificationStep;
