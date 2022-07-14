// SPDX-License-Identifier: BUSL-1.1

import {MagicUserMetadata} from '@magic-sdk/react-native';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {fetchUserProfile} from '@store/modules/Auth/sagas/fetchUserProfile';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_EMAIL.START.create;

export function* signInEmailSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {email} = action.payload;
    const token: string = yield magic.auth.loginWithMagicLink({
      email,
    });

    yield put(AuthActions.SET_TOKEN.STATE.create(token));

    const metadata: MagicUserMetadata = yield magic.user.getMetadata();

    if (!metadata.issuer) {
      throw new Error('metadata.issuer is empty');
    }

    const profile: SagaReturnType<typeof fetchUserProfile> = yield call(
      fetchUserProfile,
      metadata.issuer,
    );

    const result = {
      magicUser: {email, phoneNumber: null, userId: metadata.issuer},
      profile,
    };

    yield put(AuthActions.SIGN_IN_EMAIL.SUCCESS.create(result));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_EMAIL.FAILED.create());
  }
}
