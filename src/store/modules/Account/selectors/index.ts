// SPDX-License-Identifier: ice License 1.0

import {RegistrationProcessFinalizedStep} from '@api/user/types';
import {lastUsedLanguageSelector} from '@store/modules/Language/selectors';
import {isOnboardingViewedSelector} from '@store/modules/Users/selectors';
import {RootState} from '@store/rootReducer';
import {getLocale, isRTL} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
import {difference} from 'lodash';

const REQUIRED_AUTH_STEPS: RegistrationProcessFinalizedStep[] = [
  'username',
  'referral',
  // 'email', TODO: temp email step disabling
  'iceBonus',
];

export const userIdSelector = (state: RootState) =>
  state.account.user?.id ?? '';

export const isAuthorizedSelector = (state: RootState) => !!state.account.user;

export const authTokenSelector = (state: RootState) => state.account.token;

export const userSelector = (state: RootState) => state.account.user;

export const appLocaleSelector = (state: RootState): SupportedLocale => {
  const user = userSelector(state);

  return user?.language ?? lastUsedLanguageSelector(state) ?? getLocale();
};

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.account.user?.phoneNumber;

export const usernameSelector = (state: RootState) =>
  state.account.user?.username || '';

export const usernameWithPrefixSelector = (state: RootState) => {
  const username = usernameSelector(state);

  if (username.length && isRTL) {
    return `${username}@`;
  } else if (username.length && !isRTL) {
    return `@${username}`;
  } else {
    return username;
  }
};

export const userInfoSelector = (state: RootState) => state.account.userInfo;

export const isAdminSelector = (state: RootState) => state.account.isAdmin;

export const isRegistrationCompleteSelector = (state: RootState) => {
  const user = userSelector(state);
  const isOnboardingViewed = isOnboardingViewedSelector(user?.id)(state);
  const registrationFinalizedSteps =
    user?.clientData?.registrationProcessFinalizedSteps ?? [];
  const isRequiredAuthStepsPassed =
    difference(REQUIRED_AUTH_STEPS, registrationFinalizedSteps).length === 0;
  return isRequiredAuthStepsPassed && isOnboardingViewed;
};

export const isPrivacyInfoShownSelector = (state: RootState) =>
  state.account.isPrivacyInfoShown;
