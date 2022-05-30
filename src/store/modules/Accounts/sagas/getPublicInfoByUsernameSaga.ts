// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {put} from 'redux-saga/effects';
import {AccountActions} from '../actions';

const actionCreator = AccountActions.GET_PUBLIC_INFO_BY_USERNAME.START.create;

export function* getPublicInfoByUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {username} = action.payload;
    yield Api.accounts.getPublicInfoByUsername({username});
    yield put(AccountActions.GET_PUBLIC_INFO_BY_USERNAME.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(
      AccountActions.GET_PUBLIC_INFO_BY_USERNAME.FAILED.create(errorMessage),
    );
  }
}
