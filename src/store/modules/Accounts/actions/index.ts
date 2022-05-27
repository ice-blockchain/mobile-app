// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

interface UserInfo {
  email: string;
  fullName: string;
  phoneNumber: string;
  referredBy: string;
  username: string;
}

interface UpdateUserInfo {
  email: string;
  fullName: string;
  phoneNumber: string;
  username: string;
  profilePicture: string;
  userId: string;
}

const CREATE_USER = createAction('CREATE_USER', {
  START: (userInfo: UserInfo) => ({userInfo}),
  SUCCESS: ({
    email,
    fullName,
    phoneNumber,
    referredBy,
    username,
  }: UserInfo) => ({email, fullName, phoneNumber, referredBy, username}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const DELETE_USER = createAction('DELETE_USER', {
  START: (userId: string) => ({userId}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const UPDATE_USER = createAction('UPDATE_USER', {
  START: ({
    email,
    fullName,
    phoneNumber,
    username,
    profilePicture,
    userId,
  }: UpdateUserInfo) => ({
    email,
    fullName,
    phoneNumber,
    username,
    profilePicture,
    userId,
  }),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const GET_PUBLIC_INFO_BY_USERNAME = createAction(
  'GET_PUBLIC_INFO_BY_USERNAME',
  {
    START: (username: string) => ({username}),
    SUCCESS: true,
    FAILED: (errorMessage: string) => ({
      errorMessage,
    }),
  },
);

const GET_USER_ACCOUNT = createAction('GET_USER_ACCOUNT', {
  START: (userId: string) => ({userId}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const AccountActions = Object.freeze({
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_PUBLIC_INFO_BY_USERNAME,
  GET_USER_ACCOUNT,
});
