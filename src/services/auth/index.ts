// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {ENV} from '@constants/env';
import {LINKS} from '@constants/links';
import auth from '@react-native-firebase/auth';
import {startAppleSignIn} from '@services/auth/signin/apple';
import {startFacebookSignIn} from '@services/auth/signin/facebook';
import {
  cleanUpGoogleSignIn,
  startGoogleSignIn,
} from '@services/auth/signin/google';
import {twitterSignIn} from '@services/auth/signin/twitter';
import {SocialSignInProvider} from '@services/auth/signin/types';
import {AuthToken} from '@services/auth/types';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from '@services/keychain';
import {t} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
import {checkProp} from '@utils/guards';
import jwt_decode from 'jwt-decode';

const TOKEN_PERSIST_KEY = 'custom_auth_token';

export const signInWithGoogle = async () => {
  const result = await startGoogleSignIn();
  if (!result.cancelled) {
    const googleCredential = auth.GoogleAuthProvider.credential(
      result.data.token,
    );
    await auth().signInWithCredential(googleCredential);
  }
  return result;
};

export const signInWithFacebook = async () => {
  const result = await startFacebookSignIn();
  if (!result.cancelled) {
    const facebookCredential = auth.FacebookAuthProvider.credential(
      result.data.token,
    );
    await auth().signInWithCredential(facebookCredential);
  }
  return result;
};

export const signInWithApple = async () => {
  const result = await startAppleSignIn();
  if (!result.cancelled) {
    const appleCredential = auth.AppleAuthProvider.credential(
      result.data.token,
      result.data.nonce,
    );
    await auth().signInWithCredential(appleCredential);
  }
  return result;
};

export const signInWithTwitter = async () => {
  return twitterSignIn();
};

export const signInWithPhoneNumber = async (phoneNumber: string) => {
  return auth().signInWithPhoneNumber(phoneNumber, true);
};

export const sendSignInLinkToEmail = async (email: string) => {
  return auth().sendSignInLinkToEmail(email, {
    dynamicLinkDomain: ENV.DEEPLINK_DOMAIN,
    handleCodeInApp: true,
    iOS: {
      bundleId: ENV.APP_ID,
    },
    android: {
      packageName: ENV.APP_ID ?? '',
      installApp: true,
    },
    url: LINKS.FIREBASE_NOTICE,
  });
};

export const sendCustomSignInLinkToEmail = async (params: {
  deviceUniqueId: string;
  email: string;
  language: string;
}) => {
  return Api.auth.sendSignInLinkToEmail(params);
};

export const getConfirmationStatus = async ({
  loginSession,
}: {
  loginSession: string;
}) => {
  try {
    const response = await Api.auth.getConfirmationStatus({loginSession});
    if (
      checkProp(response, 'accessToken') &&
      checkProp(response, 'refreshToken')
    ) {
      return {
        confirmed: true,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
    }

    if (checkProp(response, 'emailConfirmed') && response.emailConfirmed) {
      return {confirmed: true};
    }

    return {confirmed: false};
  } catch (error) {
    if (
      isApiError(error, 404, 'NO_PENDING_LOGIN_SESSION') ||
      isApiError(error, 403)
    ) {
      throw error;
    }
    return {confirmed: false};
  }
};

export const verifyBeforeUpdateEmail = async (email: string) => {
  return auth().currentUser?.verifyBeforeUpdateEmail(email, {
    url: `${LINKS.VERIFY_EMAIL}?email=${email}`,
    iOS: {
      bundleId: ENV.APP_ID,
    },
    android: {
      packageName: ENV.APP_ID ?? '',
    },
  });
};

export const verifyPhoneNumber = (phoneNumber: string) => {
  return new Promise<string>((resolve, reject) => {
    auth()
      .verifyPhoneNumber(phoneNumber, undefined, true)
      .on('state_changed', phoneAuthSnapshot => {
        switch (phoneAuthSnapshot.state) {
          case 'sent':
            resolve(phoneAuthSnapshot.verificationId);
            break;
          case 'error':
          case 'timeout':
            reject(phoneAuthSnapshot.error);
            break;
        }
      });
  });
};

export const signInWithEmailLink = async (email: string, emailLink: string) => {
  return auth().signInWithEmailLink(email, emailLink);
};

export const isSignInWithEmailLink = (emailLink: string) => {
  return auth().isSignInWithEmailLink(emailLink);
};

export const isUpdateEmailLink = (url: URL) => {
  const link = url.searchParams.get('link');
  if (link) {
    return link.includes(LINKS.VERIFY_EMAIL);
  }
  return false;
};

const getSignInMethodForProvider = (provider: SocialSignInProvider) => {
  switch (provider) {
    case 'apple':
      return signInWithApple;
    case 'google':
      return signInWithGoogle;
    case 'facebook':
      return signInWithFacebook;
    case 'twitter':
      return signInWithTwitter;
    default:
      throw new Error(`Auth ${provider} is not supported yet`);
  }
};

export const signInWithProvider = (provider: SocialSignInProvider) => {
  return getSignInMethodForProvider(provider)();
};

export const cleanUpSignInProviders = async () => {
  await cleanUpGoogleSignIn();
};

export const onUserChanged = (listener: () => void) => {
  return auth().onUserChanged(listener);
};

export const clearPersistedAuthTokens = async () => {
  await clearPersistedToken();
  if (auth().currentUser) {
    /**
     * auth().signOut triggers onAuthStateChanged, so calling it in the end
     */
    await auth().signOut();
  }
};

export const refreshAuthToken = async (
  currentToken: AuthToken,
  {
    /**
     * Force refresh firebase token regardless of token expiration.
     *  Might be used when updated user claims are needed to be fetched.
     *  if forceUpdate->true, getIdTokenResult triggers onUserChanged upon completion
     */
    forceUpdate = false,
  }: {forceUpdate?: boolean} = {},
) => {
  switch (currentToken.issuer) {
    case 'firebase':
      const newFirebaseToken = await auth().currentUser?.getIdTokenResult(
        forceUpdate,
      );
      if (!newFirebaseToken) {
        return null;
      }
      return {
        accessToken: newFirebaseToken.token,
        issuer: 'firebase',
      } as const;
    case 'custom':
      const newCustomToken = await Api.auth.refreshTokens({
        refreshToken: currentToken.refreshToken,
      });
      const token = {
        ...newCustomToken,
        issuer: 'custom',
      } as const;
      await persistToken(token);
      return token;
  }
  return null;
};

export const getAuthProvider = async () => {
  return auth()
    .currentUser?.getIdTokenResult()
    .then(({claims}) => claims.firebase.sign_in_provider);
};

export const getAuthenticatedUser = async (forceRefresh?: boolean) => {
  const firebaseUser = auth().currentUser;
  if (firebaseUser) {
    const idTokenResult = await firebaseUser.getIdTokenResult(forceRefresh);
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      phoneNumber: firebaseUser.phoneNumber,
      isAdmin: idTokenResult.claims.role === 'admin',
      token: {
        accessToken: idTokenResult.token,
        issuer: 'firebase',
      },
    } as const;
  }

  const customToken = await readPersistedCustomToken();
  if (customToken) {
    const customUser = jwt_decode(customToken.accessToken);

    if (
      checkProp(customUser, 'sub') &&
      typeof customUser.sub === 'string' &&
      checkProp(customUser, 'email') &&
      typeof customUser.email === 'string'
    ) {
      return {
        uid: customUser.sub,
        email: customUser.email,
        phoneNumber: null,
        isAdmin: false,
        token: customToken,
      } as const;
    } else {
      throw new Error('Invalid persisted accessToken');
    }
  }

  return null;
};

export const persistToken = (token: AuthToken) => {
  return setSecureValue(TOKEN_PERSIST_KEY, JSON.stringify(token));
};

export const readPersistedCustomToken = async () => {
  const value = await getSecureValue(TOKEN_PERSIST_KEY);
  if (value) {
    const token = JSON.parse(value);
    if (
      checkProp(token, 'accessToken') &&
      checkProp(token, 'refreshToken') &&
      checkProp(token, 'issuer')
    ) {
      return token as AuthToken;
    }
  }
  return null;
};

export const clearPersistedToken = () => {
  return removeSecureValue(TOKEN_PERSIST_KEY);
};

export const getAuthErrorMessage = (error: {code: string}) => {
  switch (error.code) {
    case 'auth/code-expired':
      return t('errors.code_expired');
    case 'auth/too-many-requests':
      return t('errors.too_many_requests');
    case 'auth/credential-already-in-use':
      return t('errors.credential_already_in_use');
    case 'auth/email-already-in-use':
      return t('errors.email_already_in_use');
    case 'auth/invalid-verification-code':
    case 'auth/invalid-verification-id':
      // Thrown if the credential is a firebase.auth.PhoneAuthProvider.credential and the verification code or verification ID of the credential is not valid.
      return t('errors.invalid_validation_code');
    case 'auth/invalid-phone-number':
    case 'auth/missing-phone-number':
      // Thrown if the phone number has an invalid format or missing.
      return t('errors.invalid_phone');
    case 'auth/user-disabled':
      // Thrown if the user corresponding to the given credential has been disabled.
      return t('errors.user_disabled');
    case 'auth/invalid-email':
      // Thrown if the email address is not valid.
      return t('errors.invalid_email');
    case 'auth/expired-action-code':
      // Thrown if OTP in email link expires.
      return t('errors.expired_action_code');
    case 'auth/account-exists-with-different-credential':
      // Thrown if there already exists an account with the email address asserted by the credential.
      return t('errors.account_exists_with_different_credential');
    case 'auth/invalid-credential':
      // Thrown if the credential is malformed or has expired.
      return t('errors.invalid_credential');
    case 'auth/operation-not-allowed':
      // Thrown if the type of account corresponding to the credential is not enabled. Enable the account type in the Firebase Console, under the Auth tab.
      return t('errors.operation_not_allowed');
    case 'auth/user-not-found':
      // Thrown if signing in with a credential from firebase.auth.EmailAuthProvider.credential and there is no user corresponding to the given email.
      return t('errors.user_not_found_for_email');
    case 'auth/network-request-failed':
      return t('errors.general_network_error');
    case 'auth/user-token-expired':
      // Thrown for example if user changed email and hasn't re-login yet
      return t('errors.user_token_expired');
    case 'auth/requires-recent-login':
      // Thrown for example if user tries to change email and much time passed after the last sign in
      return t('errors.requires_recent_login');
    default:
      return error.code;
  }
};

export const getAuthLanguageCode = () => {
  return auth().languageCode;
};

export const setAuthLanguageCode = async (
  languageCode: SupportedLocale | null,
) => {
  return auth().setLanguageCode(languageCode);
};

export const updatePhoneNumber = async (
  verificationId: string,
  code: string,
) => {
  const credential = auth.PhoneAuthProvider.credential(verificationId, code);
  return auth().currentUser?.updatePhoneNumber(credential);
};

export const isAuthError = (error: unknown): error is {code: string} => {
  return (
    checkProp(error, 'code') &&
    typeof error.code === 'string' &&
    error.code.startsWith('auth/')
  );
};
