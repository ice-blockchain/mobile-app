// SPDX-License-Identifier: BUSL-1.1

import {Magic} from '@magic-sdk/react-native';

const magic = new Magic('pk_live_9816E034A57FC5C2');

class MagicLink {
  token: string = '';

  checkUser = async (cb: (param: {email: string | null}) => void) => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const r = await magic.user.getMetadata();
        console.log(r);
        cb({email: r.email});
        this.token = await this.getToken();
      }
    } catch (err) {
      throw new Error('User is not logged in');
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
