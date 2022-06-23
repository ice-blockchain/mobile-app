// SPDX-License-Identifier: BUSL-1.1

import {magicLink} from '@services/magicLink';
import {AuthActions, SignInResultType} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_SOCIAL.START.create;

export function* signInSocialSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {provider} = action.payload;
    const result: SignInResultType = yield magicLink.socialLogin(provider);
    yield put(AuthActions.SIGN_IN_SOCIAL.SUCCESS.create(result));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_SOCIAL.FAILED.create());
  }
}
