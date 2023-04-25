// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import RNTwitterSignIn from '@react-native-twitter-signin/twitter-signin';
import {SocialSignInMethod} from '@services/auth/signin/types';
import {checkProp} from '@utils/guards';
import {removeInvalidUsernameCharacters} from '@utils/username';

RNTwitterSignIn.init(
  ENV.TWITTER_CONSUMER_KEY ?? '',
  ENV.TWITTER_CONSUMER_SECRET ?? '',
);

export const startTwitterSignIn: SocialSignInMethod<{
  token: string;
  secret: string;
}> = async () => {
  try {
    // TODO:: create a patch for @react-native-twitter-signin/twitter-signin
    // the patch should add a request to @"https://api.twitter.com/1.1/users/lookup.json" to get the user.name
    // on iOS [client sendTwitterRequest] might be used
    const {authToken, authTokenSecret, userName, email} =
      await RNTwitterSignIn.logIn();
    if (!authToken || !authTokenSecret) {
      throw new Error(
        'Twitter Sign-In failed - no authToken or authTokenSecret returned',
      );
    }
    return {
      cancelled: false,
      data: {
        token: authToken,
        secret: authTokenSecret,
      },
      userInfo: {
        userHandle: removeInvalidUsernameCharacters(
          userName ?? email?.split('@')[0] ?? '',
        ),
        firstName: null,
        lastName: null,
      },
    };
  } catch (error) {
    if (
      // Android
      (checkProp(error, 'code') && error.code === 'USER_CANCELLED') ||
      // iOS
      (checkProp(error, 'userInfo') &&
        checkProp(error.userInfo, 'NSLocalizedDescription') &&
        error.userInfo.NSLocalizedDescription === 'User cancelled login flow.')
    ) {
      return {
        cancelled: true,
      };
    }
    throw error;
  }
};
