// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {OAuthRedirectResult} from '@magic-ext/react-native-oauth';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {fetchUserProfile} from '@store/modules/Auth/sagas/fetchUserProfile';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_SOCIAL.START.create;

export function* signInSocialSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {provider} = action.payload;

    const socialLoginInfo: OAuthRedirectResult =
      yield magic.oauth.loginWithPopup({
        provider,
        redirectURI: `${ENV.MAGIC_DEEPLINK_SCHEME}://login`,
      });

    const {email, phoneNumber} = socialLoginInfo.oauth.userInfo;

    yield put(
      AuthActions.SET_TOKEN.STATE.create(socialLoginInfo.magic.idToken),
    );

    if (!socialLoginInfo.magic.userMetadata.issuer) {
      throw new Error('metadata.issuer is empty');
    }

    const profile: SagaReturnType<typeof fetchUserProfile> = yield call(
      fetchUserProfile,
      socialLoginInfo.magic.userMetadata.issuer,
    );

    const result = {
      magicUser: {
        email: email ?? null,
        phoneNumber: phoneNumber ?? null,
        userId: socialLoginInfo.magic.userMetadata.issuer,
      },
      profile,
    };

    yield put(AuthActions.SIGN_IN_SOCIAL.SUCCESS.create(result));
  } catch (error) {
    yield put(AuthActions.SIGN_IN_SOCIAL.FAILED.create());
  }
}
