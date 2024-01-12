// SPDX-License-Identifier: ice License 1.0

import {Country} from '@constants/countries';
import {getCountryByCode} from '@utils/country';
import parsePhoneNumber, {
  CountryCode,
  formatIncompletePhoneNumber,
} from 'libphonenumber-js/min';
import {sha256} from 'react-native-sha256';

export function getCountryByPhoneNumber(phoneNumber: string | null): {
  country: Country | null;
  nationalNumber: string | null;
} | null {
  if (!phoneNumber) {
    return null;
  }
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
  const country = parsedPhoneNumber
    ? getCountryByCode(parsedPhoneNumber.country).current
    : null;
  return {country, nationalNumber: parsedPhoneNumber?.nationalNumber ?? null};
}

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
 * countryCode helps to parse numbers in E.164 format
 * e.g. 8 (909) 999-66-99 -> +79099996699
 */
export const e164PhoneNumber = (phone: string, countryCode?: string | null) => {
  return (
    parsePhoneNumber(phone, countryCode as CountryCode)?.format('E.164') ?? null
  );
};

export const hashPhoneNumber = (phone: string) => {
  return sha256(phone);
};

/**
 * countryCode helps to parse numbers in INTERNATIONAL format
 * e.g. 41 (44) 668-18-00 -> +41 44 668 18 00
 */

export const internationalPhoneNumber = (
  phone: string,
  countryCode?: string | null,
) => {
  return (
    parsePhoneNumber(phone, countryCode as CountryCode)?.format(
      'INTERNATIONAL',
    ) ?? null
  );
};

export const cleanNumberFromWhiteSpaces = (phone: string) => {
  return phone.replace(/ /g, '');
};
