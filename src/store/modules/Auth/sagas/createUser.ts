// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {userDataSelector} from '@store/modules/Auth/selectors';
import {
  refUsernameSelector,
  usernameSelector,
} from '@store/modules/Validation/selectors';
import {isEmpty} from 'lodash';
import {sha256} from 'react-native-sha256';
import {call, put, select} from 'redux-saga/effects';

export function* createUserSaga() {
  try {
    const userData: ReturnType<typeof userDataSelector> = yield select(
      userDataSelector,
    );
    console.log(userData);

    const username: ReturnType<typeof usernameSelector> = yield select(
      usernameSelector,
    );
    console.log(username);

    const refUsername: ReturnType<typeof refUsernameSelector> = yield select(
      refUsernameSelector,
    );
    console.log(refUsername);

    let phoneNumber = null;
    let phoneNumberHash: string | null = null;
    let email = null;

    if (userData) {
      phoneNumber = !isEmpty(userData.phoneNumber)
        ? userData.phoneNumber
        : null;
      email = !isEmpty(userData.email) ? userData.email : null;

      if (phoneNumber) {
        phoneNumberHash = yield call(sha256, phoneNumber);
      }
    }

    yield Api.user.createUser({
      username: username || '',
      email: email,
      phoneNumber: phoneNumber,
      phoneNumberHash: phoneNumberHash,
      referredBy: refUsername,
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
