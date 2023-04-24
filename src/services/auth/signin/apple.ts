// SPDX-License-Identifier: ice License 1.0

import appleAuth from '@invertase/react-native-apple-authentication';
import {SocialSignInMethod} from '@services/auth/signin/types';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import {removeInvalidUsernameCharacters} from '@utils/username';

export const startAppleSignIn: SocialSignInMethod<{
  token: string;
  nonce: string;
}> = async () => {
  try {
    const result = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!result.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    const fullName = result.fullName;

    return {
      cancelled: false,
      data: {
        token: result.identityToken,
        nonce: result.nonce,
      },
      userInfo: {
        userHandle: removeInvalidUsernameCharacters(
          fullName?.nickname ?? result.email?.split('@')[0] ?? '',
        ),
        firstName: [fullName?.givenName, fullName?.middleName].join(' ').trim(),
        lastName: fullName?.familyName,
      },
    };
  } catch (error) {
    if (checkProp(error, 'code')) {
      switch (error.code) {
        case appleAuth.Error.CANCELED:
          return {cancelled: true};
        default:
          throw new Error(
            t('errors.unknown_error_with_code', {code: String(error.code)}),
          );
      }
    }
    throw error;
  }
};
