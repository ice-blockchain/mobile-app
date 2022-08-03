// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {OAuthProvider} from '@magic-ext/react-native-oauth';
import {createAction} from '@store/utils/actions/createAction';

type SignInResult = {
  magicUser: {
    phoneNumber: string | null | undefined;
    email: string | null;
    userId: string;
  };
  user: User | null;
};

const SET_TOKEN = createAction('SET_TOKEN', {
  STATE: token => ({token}),
});

const STORE_WELCOME_SEEN = createAction('STORE_WELCOME_SEEN', {
  STATE: () => {},
});

const LOAD_USER = createAction('LOAD_USER', {
  STATE: (
    magicUser?: {
      email: string | null;
      phoneNumber: string | null | undefined;
      userId: string;
    },
    user?: User,
  ) => ({magicUser, user}),
});

const CREATE_USER = createAction('CREATE_USER', {
  START: () => {},
  SUCCESS: (result: User) => ({result}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const FETCH_USER = createAction('FETCH_USER', {
  START: () => {},
  SUCCESS: (result: User) => ({result}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const SIGN_OUT = createAction('SIGN_OUT', {
  START: true,
  SUCCESS: true,
  FAILED: true,
});

const SIGN_IN_EMAIL = createAction('SIGN_IN_EMAIL', {
  START: (email: string) => ({email}),
  SUCCESS: (result: SignInResult) => ({
    result,
  }),
  FAILED: true,
});

const SIGN_IN_PHONE = createAction('SIGN_IN_PHONE', {
  START: (phone: string) => ({phone}),
  SUCCESS: (result: SignInResult) => ({
    result,
  }),
  FAILED: true,
});

const SIGN_IN_SOCIAL = createAction('SIGN_IN_SOCIAL', {
  START: (provider: OAuthProvider) => ({provider}),
  SUCCESS: (result: SignInResult) => ({result}),
  FAILED: true,
});

const SET_CODE_VERIFIED = createAction('SET_CODE_VERIFIED', {
  STATE: () => {},
});

const DELETE_ACCOUNT = createAction('DELETE_ACCOUNT', {
  START: true,
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const UPDATE_ACCOUNT = createAction('UPDATE_ACCOUNT', {
  START: (userInfo: User) => ({userInfo}),
  SUCCESS: (result: User) => ({result}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const AuthActions = Object.freeze({
  SET_TOKEN,
  LOAD_USER,
  FETCH_USER,
  STORE_WELCOME_SEEN,
  SIGN_IN_EMAIL,
  SIGN_IN_PHONE,
  SIGN_IN_SOCIAL,
  SIGN_OUT,
  SET_CODE_VERIFIED,
  DELETE_ACCOUNT,
  CREATE_USER,
  UPDATE_ACCOUNT,
});
