// SPDX-License-Identifier: BUSL-1.1

import {
  CountryCode,
  formatIncompletePhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js/min';
import {sha256} from 'react-native-sha256';

export const formatPhoneNumber = (
  phone: string,
  countryIsoCode?: string,
  countryIddCode?: string,
) => {
  const formatted = formatIncompletePhoneNumber(
    phone,
    countryIsoCode as CountryCode,
  );
  if (countryIddCode) {
    return formatted.replace(countryIddCode, '').trim();
  } else {
    return formatted;
  }
};

/**
 * defaultCountryCode helps to parse numbers in national format
 * e.g. 8 (909) 999-66-99 -> +79099996699
 */
export const e164PhoneNumber = (
  phone: string,
  defaultCountryCode?: string | null,
): string => {
  return parsePhoneNumberWithError(
    phone,
    defaultCountryCode as CountryCode,
  ).format('E.164');
};

export const hashPhoneNumber = (phone: string) => {
  return sha256(phone);
};
