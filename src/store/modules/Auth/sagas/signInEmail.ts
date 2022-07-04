// SPDX-License-Identifier: BUSL-1.1

import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_EMAIL.START.create;

export function* signInEmailSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {email} = action.payload;
    const token: string = yield magic.auth.loginWithMagicLink({
      email,
    });

    const result = {userData: {email, phoneNumber: null}, token};

    yield put(AuthActions.SIGN_IN_EMAIL.SUCCESS.create(result));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_EMAIL.FAILED.create());
  }
}
