// SPDX-License-Identifier: ice License 1.0

import auth from '@react-native-firebase/auth';
import {checkProp} from '@utils/guards';
import {removeInvalidUsernameCharacters} from '@utils/username';

export const twitterSignIn = async () => {
  try {
    const userCredential = await auth().signInWithProvider('twitter.com');

    return {
      cancelled: false,
      userInfo: {
        userHandle: removeInvalidUsernameCharacters(
          userCredential.additionalUserInfo?.username ?? '',
        ),
        firstName: userCredential.user.displayName,
        lastName: null,
      },
    } as const;
  } catch (error) {
    if (
      checkProp(error, 'code') &&
      (error.code === 'auth/web-context-canceled' ||
        error.code === 'auth/popup-closed-by-user')
    ) {
      return {cancelled: true} as const;
    }
    throw error;
  }
};
