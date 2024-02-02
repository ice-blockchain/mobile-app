// SPDX-License-Identifier: ice License 1.0

import {WELCOME_STEPS} from '@navigation/Welcome';
import {RootState} from '@store/rootReducer';
import {getLocale} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';

export const userIdSelector = (state: RootState) =>
  state.account.user?.id ?? '';

export const isAuthorizedSelector = (state: RootState) => !!state.account.user;

export const authTokenSelector = (state: RootState) => state.account.token;

export const userMetadataSelector = (state: RootState) =>
  state.account.metadata;

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

export const firstMiningDateSelector = (state: RootState) => {
  const user = userSelector(state);
  return user?.clientData?.rate?.firstMiningDate || null;
};

/** Last date when rate app alert has been shown */

export const lastShowingDateSelector = (state: RootState) => {
  const user = userSelector(state);
  return user?.clientData?.rate?.lastShowingDate || null;
};

/** Used to determine how many times we previously have shown the Rate view */

export const showingsCountSelector = (state: RootState) => {
  const user = userSelector(state);
  return user?.clientData?.rate?.showingsCount ?? 0;
};

export const bscWarningConfirmedSelector = (state: RootState) => {
  return state.account.bscAddrWarningConfirmed;
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

export const installReferrerSelector = (state: RootState) =>
  state.account.installReferrer;

export const isTeamEnabledSelector = (state: RootState) =>
  !!state.account.authConfig?.team?.enabled;

export const isAchievementsEnabledSelector = (state: RootState) =>
  !!state.account.authConfig?.achievements?.enabled;

export const verifiedSelector = (state: RootState) =>
  !!state.account.user?.verified;

export const distributionXPostLinkSelector = (state: RootState) =>
  state.account.authConfig?.['social2-kyc']?.['x-post-link'];

export const quizTermsAcceptedSelector = (state: RootState) => {
  const user = userSelector(state);
  return user?.clientData?.quiz?.quizTermsAccepted ?? false;
};

export const dynamicDistributionDataSelector = (state: RootState) =>
  state.account.authConfig?.['dynamic-distribution-kyc'];
