// SPDX-License-Identifier: BUSL-1.1

import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

export function* getTokenSaga() {
  try {
    const token: string = yield magic.user.getIdToken();

    yield put(AuthActions.GET_TOKEN.SUCCESS.create(token));
  } catch (error) {
    yield put(AuthActions.GET_TOKEN.FAILED.create());
  }
}
