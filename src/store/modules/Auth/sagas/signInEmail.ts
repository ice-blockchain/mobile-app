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

    const authInfo = {email, phoneNumber: null};
    const result = {success: true, authInfo};

    yield put(AuthActions.SIGN_IN_EMAIL.SUCCESS.create(result));
    yield put(AuthActions.STORE_TOKEN.STATE.create(token));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_EMAIL.FAILED.create());
  }
}
