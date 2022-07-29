// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = AuthActions.UPDATE_ACCOUNT.START.create;

export function* updateAccountSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const userId: string = yield select(userIdSelector);
    const userInfo = {...action.payload.userInfo};

    if (userInfo.phoneNumber) {
      userInfo.phoneNumberHash = yield call(
        hashPhoneNumber,
        userInfo.phoneNumber,
      );
    }

    const result: User = yield Api.user.modifyUser(userId, userInfo);
    yield put(AuthActions.UPDATE_ACCOUNT.SUCCESS.create(result));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(AuthActions.UPDATE_ACCOUNT.FAILED.create(errorMessage));
  }
}
