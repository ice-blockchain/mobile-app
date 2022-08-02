// SPDX-License-Identifier: BUSL-1.1

import {countriesCode} from '@constants/countries';
import {RootState} from '@store/rootReducer';

export const deviceSettingsSelector = (state: RootState) =>
  state.devices.settings;

export const deviceUniqueIdSelector = (state: RootState) =>
  state.devices.deviceUniqueId as string;

export const isDevicesInitializedSelector = (state: RootState) =>
  state.devices.isInitialized;

export const deviceLocationSelector = (state: RootState) =>
  state.devices.location;

export const deviceCountrySelector = (state: RootState) => {
  const deviceCountryCode = state.devices.location?.country;
  if (deviceCountryCode) {
    return (
      countriesCode.find(
        country =>
          country.isoCode.toLowerCase() === deviceCountryCode.toLowerCase(),
      ) ?? countriesCode[0]
    );
  }
  return countriesCode[0];
};
