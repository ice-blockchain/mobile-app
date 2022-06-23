// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {OAuthRedirectResult} from '@magic-ext/react-native-oauth';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_SOCIAL.START.create;

export function* signInSocialSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {provider} = action.payload;

    const socialLoginInfo: OAuthRedirectResult =
      yield magic.oauth.loginWithPopup({
        provider,
        redirectURI: `${ENV.MAGIC_DEEPLINK_SCHEME}://login`,
      });

    const {email} = socialLoginInfo.oauth.userInfo;
    const authInfo = {email, phoneNumber: null};
    const result = {success: true, authInfo, socialLoginInfo};

    yield put(AuthActions.SIGN_IN_SOCIAL.SUCCESS.create(result));
    yield put(
      AuthActions.STORE_TOKEN.STATE.create(socialLoginInfo.magic.idToken),
    );
  } catch (error) {
    yield put(AuthActions.SIGN_IN_SOCIAL.FAILED.create());
  }
}
