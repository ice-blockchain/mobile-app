// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

const USERNAME_VALIDATION = createAction('USERNAME_VALIDATION', {
  START: (username: string) => ({username}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const PHONE_VALIDATION = createAction('PHONE_VALIDATION', {
  START: (phoneNumber: string, validationCode: string) => ({
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
  PHONE_VALIDATION,
});
