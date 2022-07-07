// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.DELETE_ACCOUNT.START.create;

export function* deleteAccountSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId} = action.payload;
    yield Api.user.deleteUser(userId);
    yield put(AuthActions.DELETE_ACCOUNT.SUCCESS.create());
    yield put(AuthActions.SIGN_OUT.START.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AuthActions.DELETE_ACCOUNT.FAILED.create(errorMessage));
  }
}
