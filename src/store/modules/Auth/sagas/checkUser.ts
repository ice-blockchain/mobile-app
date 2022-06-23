// SPDX-License-Identifier: BUSL-1.1

import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {UserDataType} from '@store/modules/Auth/reducer';
import {userDataSelector} from '@store/modules/Auth/selectors';
import {put, select} from 'redux-saga/effects';

export function* checkUserSaga() {
  try {
    const isLoggedIn: boolean = yield magic.user.isLoggedIn();

    const usersData: UserDataType = yield select(userDataSelector);

    if (isLoggedIn) {
      yield put(
        AuthActions.STORE_USER_DATA.STATE.create({
          success: true,
          authInfo: {
            email: usersData.email ? usersData.email.toLowerCase() : null,
            phoneNumber: usersData.phoneNumber,
          },
        }),
      );
    } else {
      yield put(
        AuthActions.STORE_USER_DATA.STATE.create({
          success: false,
          authInfo: {
            email: null,
            phoneNumber: null,
          },
        }),
      );
    }
  } catch (error) {
    yield put(
      AuthActions.STORE_USER_DATA.STATE.create({
        success: false,
        authInfo: {
          email: null,
          phoneNumber: null,
        },
      }),
    );
  }
}
