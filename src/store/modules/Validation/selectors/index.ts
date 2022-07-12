// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const isUsernameValidSelector = (state: RootState) =>
  state.validation.isUsernameValid;

export const refUsernameSelector = (state: RootState) =>
  state.validation.refUsername;

export const usernameSelector = (state: RootState) => state.validation.username;

export const usernameValidationErrorSelector = (state: RootState) =>
  state.validation.usernameValidationError;
