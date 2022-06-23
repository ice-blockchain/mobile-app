// SPDX-License-Identifier: BUSL-1.1

import {magicLink} from '@services/magicLink';
import {AuthActions, SignInResultType} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_PHONE.START.create;

export function* signInPhoneSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {phone} = action.payload;
    const result: SignInResultType = yield magicLink.loginUserPhoneNumber(
      phone,
    );
    yield put(AuthActions.SIGN_IN_PHONE.SUCCESS.create(result));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_PHONE.FAILED.create());
  }
}
