// SPDX-License-Identifier: BUSL-1.1

import {MagicUserMetadata} from '@magic-sdk/react-native';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

export function* loadUserSaga() {
  try {
    const [token, metadata]: [string, MagicUserMetadata] = yield Promise.all([
      magic.user.getIdToken(),
      magic.user.getMetadata(),
    ]);
    if (token) {
      yield put(
        AuthActions.LOAD_USER.STATE.create(token, {
          userId: metadata.issuer ?? '',
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
