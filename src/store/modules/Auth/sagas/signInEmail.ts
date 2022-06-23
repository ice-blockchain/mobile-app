// SPDX-License-Identifier: BUSL-1.1

import {magicLink} from '@services/magicLink';
import {AuthActions, SignInResultType} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_EMAIL.START.create;

export function* signInEmailSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {email} = action.payload;
    const result: SignInResultType = yield magicLink.loginUser(email);
    yield put(AuthActions.SIGN_IN_EMAIL.SUCCESS.create(result));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_EMAIL.FAILED.create());
  }
}
