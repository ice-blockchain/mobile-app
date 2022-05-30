// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {put} from 'redux-saga/effects';

import {AccountActions} from '../actions';

const actionCreator = AccountActions.DELETE_USER.START.create;

export function* deleteUserSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId} = action.payload;
    yield Api.accounts.deleteUser({userId});
    yield put(AccountActions.DELETE_USER.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AccountActions.DELETE_USER.FAILED.create(errorMessage));
  }
}
