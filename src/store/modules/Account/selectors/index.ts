// SPDX-License-Identifier: ice License 1.0

import {WELCOME_STEPS} from '@navigation/Welcome';
import {createSelector} from '@reduxjs/toolkit';
import {deviceLocationSelector} from '@store/modules/Devices/selectors';
import {RootState} from '@store/rootReducer';
import {deviceLocaleCountry, getLocale} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
import {checkProp} from '@utils/guards';

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

export const isFaceDetectionEnabledSelector = (state: RootState) =>
  !!state.account.authConfig?.['face-detection']?.enabled;

export const isEmailCodeFlowSelector = createSelector(
  [authConfigSelector, deviceLocationSelector],
  (authConfig, deviceLocation) => {
    const isEqualsToDeviceCountry = (country: string) => {
      return [
        deviceLocaleCountry.toLowerCase(),
        deviceLocation?.country?.toLowerCase(),
      ].includes(country.toLowerCase());
    };

    if (authConfig) {
      if (checkProp(authConfig, 'emailCodeAuthWhiteList')) {
        return authConfig.emailCodeAuthWhiteList.some(isEqualsToDeviceCountry);
      }

      if (checkProp(authConfig, 'emailCodeAuthBlackList')) {
        return !authConfig.emailCodeAuthBlackList.some(isEqualsToDeviceCountry);
      }
    }

    return false;
  },
);
