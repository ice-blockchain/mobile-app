// SPDX-License-Identifier: BUSL-1.1

import {Magic} from '@magic-sdk/react-native';

const m = new Magic('API_KEY');

export const checkUser = async cb => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await m.user.getMetadata();
    return cb({isLoggedIn: true, email: user.email});
  }
  return cb({isLoggedIn: false});
};

export const loginUser = async email => {
  await m.auth.loginWithMagicLink({email});
};

export const logoutUser = async () => {
  await m.user.logout();
};

export default m;
