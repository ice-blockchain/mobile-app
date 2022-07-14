// SPDX-License-Identifier: BUSL-1.1

import {UserProfile} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const USERNAME_VALIDATION = createAction('USERNAME_VALIDATION', {
  START: (username: string) => ({username}),
  SUCCESS: (username: string) => ({username}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const REF_USERNAME_VALIDATION = createAction('REF_USERNAME_VALIDATION', {
  START: (refUsername: string, skipValidation: boolean) => ({
    refUsername,
    skipValidation,
  }),
  SUCCESS: (refUser: UserProfile | null) => ({refUser}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const PHONE_VALIDATION = createAction('PHONE_VALIDATION', {
  START: (userId: string, phoneNumber: string, validationCode: string) => ({
    userId,
    phoneNumber,
    validationCode,
  }),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const RESET_VALIDATION_ERRORS = createAction('RESET_VALIDATION_ERRORS', {
  STATE: () => {},
});

export const ValidationActions = Object.freeze({
  USERNAME_VALIDATION,
  REF_USERNAME_VALIDATION,
  PHONE_VALIDATION,
  RESET_VALIDATION_ERRORS,
});
