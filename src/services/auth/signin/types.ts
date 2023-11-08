// SPDX-License-Identifier: ice License 1.0

export type SignInUserInfo = {
  userHandle: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
};

export type SocialSignInMethod<T> = () => Promise<
  | {
      cancelled: false;
      data: T;
      userInfo: SignInUserInfo;
    }
  | {cancelled: true}
>;

export type SocialSignInProvider = 'apple' | 'google' | 'facebook' | 'twitter';

export enum AuthError {
  AuthInProgress = 'AuthInProgress',
  PlayServicesNotAvailable = 'PlayServicesNotAvailable',
  UnknownError = 'UnknownError',
}
