// SPDX-License-Identifier: BUSL-1.1

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
  SUCCESS: (refUsername: string) => ({refUsername}),
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

export const ValidationActions = Object.freeze({
  USERNAME_VALIDATION,
  REF_USERNAME_VALIDATION,
  PHONE_VALIDATION,
});
