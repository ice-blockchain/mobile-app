// SPDX-License-Identifier: BUSL-1.1

import {
  OAuthProvider,
  OAuthRedirectResult,
} from '@magic-ext/react-native-oauth';
import {createAction} from '@store/utils/actions/createAction';

type CommonSignInResultType = {
  phoneNumber: string | null;
  email: string | null | undefined;
};

export type SignInResultType = {
  success: boolean;
  authInfo: CommonSignInResultType;
  socialLoginInfo?: OAuthRedirectResult;
};

const STORE_USER_DATA = createAction('STORE_USER_DATA', {
  STATE: (result: SignInResultType) => ({result}),
});
const STORE_TOKEN = createAction('STORE_TOKEN', {
  STATE: (token: string) => ({token}),
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

const SIGN_IN_EMAIL = createAction('SIGN_IN_EMAIL', {
  START: (email: string) => ({email}),
  SUCCESS: (result: SignInResultType) => ({
    result,
  }),
  FAILED: true,
});

const SIGN_IN_PHONE = createAction('SIGN_IN_PHONE', {
  START: (phone: string) => ({phone}),
  SUCCESS: (result: SignInResultType) => ({
    result,
  }),
  FAILED: true,
});

const SIGN_IN_SOCIAL = createAction('SIGN_IN_SOCIAL', {
  START: (provider: OAuthProvider) => ({provider}),
  SUCCESS: (result: SignInResultType) => ({result}),
  FAILED: true,
});

const GET_TOKEN = createAction('GET_TOKEN', {
  START: true,
  SUCCESS: (token: string) => ({token}),
  FAILED: true,
});

export const AuthActions = Object.freeze({
  GET_TOKEN,
  STORE_TOKEN,
  SIGN_IN_EMAIL,
  SIGN_IN_PHONE,
  SIGN_IN_SOCIAL,
  STORE_USER_DATA,
  STORE_CLAIM_NICKNAME_DONE,
  STORE_WELCOME_SEEN,
  SIGN_OUT,
});
