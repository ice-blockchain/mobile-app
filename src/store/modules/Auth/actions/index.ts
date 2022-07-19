// SPDX-License-Identifier: BUSL-1.1

import {UserProfile} from '@api/user/types';
import {OAuthProvider} from '@magic-ext/react-native-oauth';
import {createAction} from '@store/utils/actions/createAction';

type SignInResult = {
  magicUser: {phoneNumber: string | null; email: string | null; userId: string};
  profile: UserProfile | null;
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
      phoneNumber: string | null;
      userId: string;
    },
    profile?: UserProfile,
  ) => ({magicUser, profile}),
});

const CREATE_USER = createAction('CREATE_USER', {
  START: () => {},
  SUCCESS: (result: UserProfile) => ({result}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const FETCH_USER_PROFILE = createAction('FETCH_USER_PROFILE', {
  START: () => {},
  SUCCESS: (result: UserProfile) => ({result}),
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

const SET_PHONE_NUMBER_VERIFIED = createAction('SET_PHONE_NUMBER_VERIFIED', {
  STATE: (phone: string) => ({phone}),
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

export const AuthActions = Object.freeze({
  SET_TOKEN,
  LOAD_USER,
  FETCH_USER_PROFILE,
  STORE_WELCOME_SEEN,
  SIGN_IN_EMAIL,
  SIGN_IN_PHONE,
  SIGN_IN_SOCIAL,
  SIGN_OUT,
  SET_PHONE_NUMBER_VERIFIED,
  SET_CODE_VERIFIED,
  DELETE_ACCOUNT,
  CREATE_USER,
});
