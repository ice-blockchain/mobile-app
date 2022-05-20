// SPDX-License-Identifier: BUSL-1.1

import {Magic} from '@magic-sdk/react-native';

const magic = new Magic('API_KEY');

class MagicLink {
  token: string = '';

  checkUser = async (): Promise<{
    email: string | null;
    phoneNumber: string | null;
  }> => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const r = await magic.user.getMetadata();
        this.token = await this.getToken();
        return {email: r.email, phoneNumber: r.phoneNumber};
      }
      return {email: null, phoneNumber: null};
    } catch (err) {
      // throw new Error('User is not logged in');
      return {email: null, phoneNumber: null};
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
      return await magic.user.getIdToken();
    } catch (err) {
      throw new Error('Authenticate current session failed');
    }
  };
}

export const magicLink = new MagicLink();

export default magic;
