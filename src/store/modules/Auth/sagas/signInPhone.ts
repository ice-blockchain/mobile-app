// SPDX-License-Identifier: BUSL-1.1

import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_PHONE.START.create;

export function* signInPhoneSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {phone} = action.payload;
    const token: string = yield magic.auth.loginWithSMS({
      phoneNumber: phone,
    });

    const authInfo = {email: null, phoneNumber: phone};
    const result = {success: true, authInfo};

    yield put(AuthActions.SIGN_IN_PHONE.SUCCESS.create(result));
    yield put(AuthActions.STORE_TOKEN.STATE.create(token));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_PHONE.FAILED.create());
  }
}
