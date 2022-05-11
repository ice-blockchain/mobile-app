// SPDX-License-Identifier: BUSL-1.1

import {Magic} from '@magic-sdk/react-native';

const magic = new Magic('pk_live_9816E034A57FC5C2');

export const checkUser = async cb => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    return cb({isLoggedIn: true, email: user.email});
  }
  return cb({isLoggedIn: false});
};

export const loginUser = async (email: string) => {
  await magic.auth.loginWithMagicLink({email});
};

export const logoutUser = async () => {
  await magic.user.logout();
};

export default magic;
