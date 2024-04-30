// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const socialKycStatusSelector = (state: RootState) =>
  state.socialKyc.socialKycStatus;

export const socialKycErrorMessageSelector = (state: RootState) =>
  state.socialKyc.socialKycErrorMessage;

export const socialKycAttemptsSelector = (state: RootState) =>
  state.socialKyc.remainingAttempts;

export const getSocialKycRepostTextStatusSelector = (state: RootState) =>
  state.socialKyc.getSocialKycRepostTextStatus;
export const socialKycRepostTextSelector = (state: RootState) =>
  state.socialKyc.repostText ?? '';
