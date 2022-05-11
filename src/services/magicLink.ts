// SPDX-License-Identifier: BUSL-1.1

import {Magic} from '@magic-sdk/react-native';
import {OAuthExtension} from '@magic-ext/react-native-oauth';

const magic = new Magic('', {
  extensions: [new OAuthExtension()],
});

type Auth = {
  isLoggedIn: boolean;
  email: string | null;
};

export const checkUser = async (callback: (auth: Auth) => void) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    return callback({isLoggedIn: true, email: user.email});
  }
  return callback({isLoggedIn: false, email: null});
};

export const loginUser = async (email: string) => {
  await magic.auth.loginWithMagicLink({email});
};

export const logoutUser = async () => {
  await magic.user.logout();
};

export const googleLogin = async () => {
  const result = await magic.oauth.loginWithPopup({
    provider: 'google',
    redirectURI:
      'https://auth.magic.link/v1/oauth2/SuvuIDFD3HTuY0n8umtDXv7NO3pqf4LR82WhAfvRr6w=/callback',
  });

  console.log(result);
};
export const facebookLogin = async () => {
  const result = await magic.oauth.loginWithPopup({
    provider: 'facebook',
    redirectURI:
      'https://auth.magic.link/v1/oauth2/SuvuIDFD3HTuY0n8umtDXv7NO3pqf4LR82WhAfvRr6w=/callback',
    scope: ['user:email'],
  });

  console.log(result);
};
export const appleLogin = async () => {
  const result = await magic.oauth.loginWithPopup({
    provider: 'apple',
    redirectURI:
      'https://auth.magic.link/v1/oauth2/SuvuIDFD3HTuY0n8umtDXv7NO3pqf4LR82WhAfvRr6w=/callback',
    scope: ['user:email'],
  });

  console.log(result);
};
export const twitterLogin = async () => {
  const result = await magic.oauth.loginWithPopup({
    provider: 'twitter',
    redirectURI:
      'https://auth.magic.link/v1/oauth2/SuvuIDFD3HTuY0n8umtDXv7NO3pqf4LR82WhAfvRr6w=/callback',
    scope: ['user:email'],
  });

  console.log(result);
};

export default magic;
