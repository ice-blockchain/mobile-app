// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {ENV} from '@constants/env';
import {LINKS} from '@constants/links';
import auth from '@react-native-firebase/auth';
import {startAppleSignIn} from '@services/auth/signin/apple';
import {startFacebookSignIn} from '@services/auth/signin/facebook';
import {startGoogleSignIn} from '@services/auth/signin/google';
import {twitterSignIn} from '@services/auth/signin/twitter';
import {SocialSignInProvider} from '@services/auth/signin/types';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from '@services/keychain';
import {t} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
import {checkProp} from '@utils/guards';
import jwt_decode from 'jwt-decode';

const CUSTOM_TOKEN_PERSIST_KEY = 'custom_auth_token';

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

export const getSignInWithEmailLinkStatus = async ({
  loginSession,
}: {
  loginSession: string;
}) => {
  try {
    return Api.auth.getSignInWithEmailLinkStatus({loginSession});
  } catch (error) {
    if (isApiError(error, 404, 'NOT_VERIFIED')) {
      return null;
    }
    throw error;
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

export const onUserChanged = (listener: () => void) => {
  return auth().onUserChanged(listener);
};

export const signOut = () => {
  return auth().signOut();
};

export const getAuthToken = async () => {
  return auth().currentUser?.getIdToken() ?? null;
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
        refreshToken: null,
        issuer: 'firebase',
      },
    } as const;
  }

  const customToken = await readPersistedCustomToken();
  if (customToken) {
    const customUser = jwt_decode(customToken.accessToken);
    console.log('customUser', customUser);
    //TODO: pick data from customUser
    return {
      uid: 'customUser.uid',
      email: 'customUser.email',
      phoneNumber: 'customUser.phoneNumber',
      isAdmin: false,
      source: 'custom',
      token: {
        accessToken: customToken.accessToken,
        refreshToken: customToken.refreshToken,
        issuer: 'custom',
      },
    } as const;
  }

  return null;
};

export const persistCustomToken = (token: {
  accessToken: string;
  refreshToken: string;
}) => {
  return setSecureValue(CUSTOM_TOKEN_PERSIST_KEY, JSON.stringify(token));
};

export const readPersistedCustomToken = async () => {
  const value = await getSecureValue(CUSTOM_TOKEN_PERSIST_KEY);
  if (value) {
    const token = JSON.parse(value);
    if (checkProp(token, 'accessToken') && checkProp(token, 'refreshToken')) {
      return token as {accessToken: string; refreshToken: string};
    }
  }
  return null;
};

export const clearPersistedCustomToken = () => {
  return removeSecureValue(CUSTOM_TOKEN_PERSIST_KEY);
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
