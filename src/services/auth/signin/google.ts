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
          throw new Error(t('errors.auth_in_progress'));
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        case 16: // https://developers.google.com/android/reference/com/google/android/gms/common/ConnectionResult#API_UNAVAILABLE
          throw {
            code: AuthError.PlayServicesNotAvailable,
            message: t('errors.google_play_services_not_available'),
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
