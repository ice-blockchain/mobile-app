// SPDX-License-Identifier: BUSL-1.1

import {all, takeLatest} from 'redux-saga/effects';

import deleteUser from './deleteUserSaga';
import createUser from './createUserSaga';
import updateUser from './updateUserSaga';
import getUserAccount from './getUserAccountSaga';
import getPublicInfoByUsername from './getPublicInfoByUsernameSaga';
import AccountActions from '../actions';

export default function* rootSaga() {
  yield all([
    takeLatest(AccountActions.CREATE_USER.START.type, createUser),
    takeLatest(AccountActions.DELETE_USER.START.type, deleteUser),
    takeLatest(AccountActions.UPDATE_USER.START.type, updateUser),
    takeLatest(AccountActions.GET_USER_ACCOUNT.START.type, getUserAccount),
    takeLatest(
      AccountActions.GET_PUBLIC_INFO_BY_USERNAME.START.type,
      getPublicInfoByUsername,
    ),
  ]);
}
