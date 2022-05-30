// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Accounts/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AccountActions.CREATE_USER.START.create;

export function* createUserSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userInfo} = action.payload;
    yield Api.accounts.createUser(userInfo);
    yield put(AccountActions.CREATE_USER.SUCCESS.create(userInfo));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AccountActions.CREATE_USER.FAILED.create(errorMessage));
  }
}
