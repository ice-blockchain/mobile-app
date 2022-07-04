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

    const result = {userData: {email: null, phoneNumber: phone}, token};

    yield put(AuthActions.SIGN_IN_PHONE.SUCCESS.create(result));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_PHONE.FAILED.create());
  }
}
