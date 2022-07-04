// SPDX-License-Identifier: BUSL-1.1

import {MagicUserMetadata} from '@magic-sdk/react-native';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

export function* loadUserSaga() {
  try {
    const isLoggedIn: boolean = yield magic.user.isLoggedIn();
    if (isLoggedIn) {
      const [token, metadata]: [string, MagicUserMetadata] = yield Promise.all([
        magic.user.getIdToken(),
        magic.user.getMetadata(),
      ]);
      yield put(
        AuthActions.LOAD_USER.STATE.create(token, {
          email: metadata.email,
          phoneNumber: metadata.phoneNumber,
        }),
      );
    } else {
      yield put(AuthActions.LOAD_USER.STATE.create());
    }
  } catch (error) {
    yield put(AuthActions.LOAD_USER.STATE.create());
  }
}
