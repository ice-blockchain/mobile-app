// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const refUserSelector = (state: RootState) => state.validation.refUser;

export const usernameSelector = (state: RootState) =>
  state.validation.username || '';

export const usernameValidationErrorSelector = (state: RootState) =>
  state.validation.usernameValidationError;

export const refUsernameValidationErrorSelector = (state: RootState) =>
  state.validation.refUsernameValidationError;

export const phoneVerificationStepSelector = (state: RootState) =>
  state.validation.phoneVerificationStep;
