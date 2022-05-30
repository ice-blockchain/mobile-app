// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Accounts/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AccountActions.UPDATE_USER.START.create;

export function* updateUserSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {email, fullName, phoneNumber, username, profilePicture, userId} =
      action.payload;

    const formData = new FormData();

    formData.append('email', email);
    formData.append('fullName', fullName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('username', username);
    formData.append('profilePicture', profilePicture);

    yield Api.accounts.updateUser({userId, formData});
    yield put(AccountActions.UPDATE_USER.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AccountActions.UPDATE_USER.FAILED.create(errorMessage));
  }
}
