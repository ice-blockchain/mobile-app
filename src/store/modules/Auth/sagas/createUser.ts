// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {sha256} from 'react-native-sha256';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.CREATE_USER.START.create;

export async function* createUserSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {username, phoneNumber, referredBy, email} = action.payload;
    let phoneNumberHash;
    if (phoneNumber) {
      phoneNumberHash = await sha256(phoneNumber);
    }

    yield Api.user.createUser({
      username,
      phoneNumber,
      phoneNumberHash,
      referredBy,
      email,
    });
    yield put(AuthActions.CREATE_USER.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AuthActions.CREATE_USER.FAILED.create(errorMessage));
  }
}
