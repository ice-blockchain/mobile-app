// SPDX-License-Identifier: BUSL-1.1

import {Magic} from '@magic-sdk/react-native';

const magic = new Magic('API_KEY');

class MagicLink {
  token: string = '';

  checkUser = async (): Promise<{email: string | null}> => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const r = await magic.user.getMetadata();
        console.log('bla r', r);
        this.token = await this.getToken();
        return {email: r.email};
      }
      return {email: null};
    } catch (err) {
      // throw new Error('User is not logged in');
      return {email: null};
    }
  };

  loginUser = async (email: string) => {
    try {
      return await magic.auth.loginWithMagicLink({email});
    } catch (err) {
      throw new Error('Login failed');
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
      return await magic.user.getIdToken();
    } catch (err) {
      throw new Error('Authenticate current session failed');
    }
  };
}

export const magicLink = new MagicLink();

export default magic;
