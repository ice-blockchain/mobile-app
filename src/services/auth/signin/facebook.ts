// SPDX-License-Identifier: ice License 1.0

import {SocialSignInMethod} from '@services/auth/signin/types';
import {removeInvalidUsernameCharacters} from '@utils/username';
import {
  AccessToken,
  LoginManager,
  Profile,
  Settings,
} from 'react-native-fbsdk-next';

Settings.initializeSDK();

export async function getFacebookAccessTokenForUserPosts() {
  const result = await LoginManager.logInWithPermissions(['user_posts']);
  if (result.isCancelled) {
    return null;
  }
  return AccessToken.getCurrentAccessToken();
}

export const startFacebookSignIn: SocialSignInMethod<{
  token: string;
}> = async () => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    return {cancelled: true};
  }

  const [token, profile] = await Promise.all([
    AccessToken.getCurrentAccessToken(),
    Profile.getCurrentProfile(),
  ]);

  if (!token) {
    throw new Error('Facebook Sign-In failed - no access token returned');
  }

  return {
    cancelled: false,
    data: {token: token.accessToken},
    userInfo: {
      userHandle: removeInvalidUsernameCharacters(
        profile?.email?.split('@')[0] ?? '',
      ),
      firstName: [profile?.firstName, profile?.middleName].join(' ').trim(),
      lastName: profile?.lastName,
    },
  };
};
