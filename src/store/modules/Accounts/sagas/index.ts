// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Accounts/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {createUserSaga} from './createUserSaga';
import {deleteUserSaga} from './deleteUserSaga';
import {getPublicInfoByUsernameSaga} from './getPublicInfoByUsernameSaga';
import {getUserAccountSaga} from './getUserAccountSaga';
import {updateUserSaga} from './updateUserSaga';

export function* rootAccountsSaga() {
  yield all([
    takeLatest(AccountActions.CREATE_USER.START.type, createUserSaga),
    takeLatest(AccountActions.DELETE_USER.START.type, deleteUserSaga),
    takeLatest(AccountActions.UPDATE_USER.START.type, updateUserSaga),
    takeLatest(AccountActions.GET_USER_ACCOUNT.START.type, getUserAccountSaga),
    takeLatest(
      AccountActions.GET_PUBLIC_INFO_BY_USERNAME.START.type,
      getPublicInfoByUsernameSaga,
    ),
  ]);
}
