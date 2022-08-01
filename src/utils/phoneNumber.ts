// SPDX-License-Identifier: BUSL-1.1

import {
  CountryCode,
  formatIncompletePhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js/min';
import {sha256} from 'react-native-sha256';

export const formatPhoneNumber = (phone: string, countryCode?: string) => {
  return formatIncompletePhoneNumber(phone, countryCode as CountryCode);
};

/**
 * defaultCountryCode helps to parse numbers in national format
 * e.g. 8 (909) 999-66-99 -> +79099996699
 */
export const e164PhoneNumber = (
  phone: string,
  defaultCountryCode?: string,
): string => {
  return parsePhoneNumberWithError(
    phone,
    defaultCountryCode as CountryCode,
  ).format('E.164');
};

export const hashPhoneNumber = (phone: string) => {
  return sha256(phone);
};
