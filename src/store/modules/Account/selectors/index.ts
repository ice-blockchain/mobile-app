// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {isOnboardingViewedSelector} from '@store/modules/Users/selectors';
import {RootState} from '@store/rootReducer';
import {getLocale} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
import {difference} from 'lodash';

const REQUIRED_REGISTRATION_FIELDS: (keyof User)[] = [
  'username',
  'referredBy',
  // 'email', TODO: temp email step disabling
];

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

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.account.user?.phoneNumber;

export const usernameSelector = (state: RootState) =>
  state.account.user?.username || '';

export const userInfoSelector = (state: RootState) => state.account.userInfo;

export const isAdminSelector = (state: RootState) => state.account.isAdmin;

export const isRegistrationCompleteSelector = (state: RootState) => {
  const user = userSelector(state);
  const isOnboardingViewed = isOnboardingViewedSelector(user?.id)(state);
  const isIceBonusViewed =
    !!user?.clientData?.registrationProcessFinalizedSteps?.includes('iceBonus');
  const isRequiredAuthStepsPassed =
    difference(REQUIRED_REGISTRATION_FIELDS, Object.keys(user ?? {})).length ===
    0;
  return isRequiredAuthStepsPassed && isOnboardingViewed && isIceBonusViewed;
};

export const isPrivacyInfoShownSelector = (state: RootState) =>
  state.account.isPrivacyInfoShown;
