// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {UserProfile} from '@api/user/types';
import {MagicUserMetadata} from '@magic-sdk/react-native';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {call, put} from 'redux-saga/effects';

export function* loadUserSaga() {
  try {
    const [token, metadata]: [string, MagicUserMetadata] = yield Promise.all([
      magic.user.getIdToken(),
      magic.user.getMetadata(),
    ]);

    if (!metadata.issuer) {
      throw new Error('metadata.issuer is empty');
    }

    if (token) {
      yield put(AuthActions.SET_TOKEN.STATE.create(token));

      const profile: UserProfile = yield call(
        Api.user.getUserById,
        metadata.issuer,
      );

      yield put(
        AuthActions.LOAD_USER.STATE.create(
          {
            userId: metadata.issuer,
            email: metadata.email,
            phoneNumber: metadata.phoneNumber,
          },
          profile,
        ),
      );
    } else {
      yield put(AuthActions.LOAD_USER.STATE.create());
    }
  } catch (error) {
    yield put(AuthActions.LOAD_USER.STATE.create());
  }
}
