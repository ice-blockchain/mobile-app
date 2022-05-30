// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

type Params = {
  email: string | null | undefined;
  phoneNumber: string | null;
  isMfaEnabled?: boolean;
  issuer?: string;
  publicAddress?: string;
};

const STORE_USER_DATA = createAction('STORE_USER_DATA', {
  STATE: (data: Params) => ({data}),
});
const STORE_CLAIM_NICKNAME_DONE = createAction('STORE_CLAIM_NICKNAME_DONE', {
  STATE: () => {},
});
const STORE_WELCOME_SEEN = createAction('STORE_WELCOME_SEEN', {
  STATE: () => {},
});

const SIGN_OUT = createAction('SIGN_OUT', {
  START: true,
  SUCCESS: true,
  FAILED: true,
});

export const AuthActions = Object.freeze({
  STORE_USER_DATA,
  STORE_CLAIM_NICKNAME_DONE,
  STORE_WELCOME_SEEN,
  SIGN_OUT,
});
