// SPDX-License-Identifier: ice License 1.0

import {WELCOME_STEPS} from '@navigation/Welcome';
import {RootState} from '@store/rootReducer';
import {getLocale} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';

export const userIdSelector = (state: RootState) =>
  state.account.user?.id ?? '';

export const isAuthorizedSelector = (state: RootState) => !!state.account.user;

export const authTokenSelector = (state: RootState) => state.account.token;

export const userSelector = (state: RootState) => state.account.user;

export const unsafeUserSelector = (state: RootState) => {
  if (!state.account.user) {
    throw new Error('User is not set');
  }
  return state.account.user;
};

export const appLocaleSelector = (state: RootState): SupportedLocale => {
  const user = userSelector(state);

  return user?.language ?? getLocale();
};

export const userIsoCodeSelector = (state: RootState) => {
  const user = userSelector(state);
  return user?.clientData?.phoneNumberIso ?? null;
};

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.account.user?.phoneNumber;

export const usernameSelector = (state: RootState) =>
  state.account.user?.username || '';

export const userInfoSelector = (state: RootState) => state.account.userInfo;

export const isAdminSelector = (state: RootState) => state.account.isAdmin;

export const isRegistrationCompleteSelector = () => {
  return WELCOME_STEPS.every(step => step.finished());
};

export const isPrivacyInfoShownSelector = (state: RootState) =>
  state.account.isPrivacyInfoShown;

export const authConfigSelector = (state: RootState) =>
  state.account.authConfig;
