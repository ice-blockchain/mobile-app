// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Accounts/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AccountActions.GET_USER_ACCOUNT.START.create;

export function* getUserAccountSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId} = action.payload;
    yield Api.accounts.getUserAccount({userId});
    yield put(AccountActions.GET_USER_ACCOUNT.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AccountActions.GET_USER_ACCOUNT.FAILED.create(errorMessage));
  }
}
