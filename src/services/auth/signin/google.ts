// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AuthError, SocialSignInMethod} from '@services/auth/signin/types';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import {removeInvalidUsernameCharacters} from '@utils/username';

GoogleSignin.configure({
  // to be able to receive idToken on Android, we need to pass webClientId
  webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
});

/**
 * According to sentry reports these errors are not handled by @react-native-google-signin/google-signin lib
 * so we process them manually by code (the codes are returned as strings)
 *
 * https://developers.google.com/android/reference/com/google/android/gms/common/ConnectionResult
 * https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInStatusCodes
 */
export const GOOGLE_SIGN_IN_CODES = {
  NETWORK_ERROR: '7',
  INTERNAL_ERROR: '8',
  API_UNAVAILABLE: '16',
  SIGN_IN_FAILED: '12500',
  SIGN_IN_CURRENTLY_IN_PROGRESS: '12502',
};

export const startGoogleSignIn: SocialSignInMethod<{
  token: string;
}> = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const result = await GoogleSignin.signIn();

    if (!result.idToken) {
      throw new Error('Google Sign-In failed - no identify token returned');
    }

    return {
      cancelled: false,
      data: {token: result.idToken},
      userInfo: {
        userHandle: removeInvalidUsernameCharacters(
          result.user.email.split('@')[0],
        ),
        firstName: result.user.givenName,
        lastName: result.user.familyName,
      },
    };
  } catch (error) {
    if (checkProp(error, 'code')) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          return {cancelled: true};
        case statusCodes.IN_PROGRESS:
        case GOOGLE_SIGN_IN_CODES.SIGN_IN_CURRENTLY_IN_PROGRESS:
          throw {
            code: AuthError.AuthInProgress,
            message: t('errors.auth_in_progress'),
          };
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        case GOOGLE_SIGN_IN_CODES.API_UNAVAILABLE:
          throw {
            code: AuthError.PlayServicesNotAvailable,
            message: t('errors.google_play_services_not_available'),
          };
        case GOOGLE_SIGN_IN_CODES.INTERNAL_ERROR:
        case GOOGLE_SIGN_IN_CODES.NETWORK_ERROR:
        case GOOGLE_SIGN_IN_CODES.SIGN_IN_FAILED:
          throw {
            code: AuthError.UnknownError,
            message: t('errors.unknown_error'),
          };
        default:
          throw new Error(
            t('errors.unknown_error_with_code', {code: String(error.code)}),
          );
      }
    }
    throw error;
  }
};

/**
 * Signs Out from the last used google account
 * That gives a possibility to choose another one
 */
export const cleanUpGoogleSignIn = async () => {
  try {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
    }
  } catch {}
};
