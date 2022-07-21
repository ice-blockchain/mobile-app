// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {UserUpdateResult} from '@api/user/types';
import {AuthActions, UserUpdate} from '@store/modules/Auth/actions';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {sha256} from 'react-native-sha256';
import {put, select} from 'redux-saga/effects';

const actionCreator = AuthActions.UPDATE_ACCOUNT.START.create;

export function* updateAccountSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userInfo} = action.payload;
    const userId: string = yield select(userIdSelector);
    const formData: FormData = new FormData();

    let phoneNumberHash: string | undefined;

    if (userInfo.phoneNumber) {
      phoneNumberHash = yield sha256(userInfo.phoneNumber);
    }

    let data: UserUpdate = userInfo;

    if (phoneNumberHash) {
      data = {
        ...userInfo,
        phoneNumberHash,
      };
    }

    for (let key in data) {
      formData.append(key, data[key as keyof UserUpdate]);
    }

    const result: UserUpdateResult = yield Api.user.updateUser({
      userId,
      formData,
    });
    yield put(AuthActions.UPDATE_ACCOUNT.SUCCESS.create(result));
    yield put(AuthActions.SET_PHONE_NUMBER_VERIFIED.STATE.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AuthActions.UPDATE_ACCOUNT.FAILED.create(errorMessage));
  }
}
