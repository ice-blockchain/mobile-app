// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {OAuthExtension, OAuthProvider} from '@magic-ext/react-native-oauth';
import {Magic} from '@magic-sdk/react-native';

export const magic = new Magic(ENV.MAGIC_LINK_KEY, {
  extensions: [new OAuthExtension()],
});

class MagicLink {
  token: string = '';

  checkUser = async (): Promise<boolean> => {
    try {
      return await magic.user.isLoggedIn();
    } catch (err) {
      // throw new Error('User is not logged in');
      return false;
    }
  };

  loginUser = async (email: string) => {
    try {
      await magic.auth.loginWithMagicLink({email});
      return true;
    } catch (err) {
      // throw new Error('Login failed');
      return false;
    }
  };

  loginUserPhoneNumber = async (phoneNumber: string) => {
    try {
      await magic.auth.loginWithSMS({phoneNumber});
      return true;
    } catch (err) {
      // throw new Error('Login failed');
      return false;
    }
  };

  logoutUser = async () => {
    try {
      return await magic.user.logout();
    } catch (err) {
      throw new Error('Logout failed');
    }
  };

  getToken = async () => {
    try {
      this.token = await magic.user.getIdToken();
    } catch (err) {
      throw new Error('Authenticate current session failed');
    }
  };

  socialLogin = async (provider: OAuthProvider) => {
    try {
      const result = await magic.oauth.loginWithPopup({
        provider,
        redirectURI: `${ENV.MAGIC_DEEPLINK_SCHEME}://login`,
      });

      return {success: true, authInfo: result};
    } catch (error) {
      // throw new Error('Login failed');
      return {success: false, authInfo: null};
    }
  };
}

export const magicLink = new MagicLink();
