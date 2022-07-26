// SPDX-License-Identifier: BUSL-1.1

import {
  CountryCode,
  formatIncompletePhoneNumber,
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js/min';
import {sha256} from 'react-native-sha256';

export const formatPhoneNumber = (phone: string, countryCode?: string) => {
  return formatIncompletePhoneNumber(phone, countryCode as CountryCode);
};

export const e164PhoneNumber = (phone: string) => {
  if (isPossiblePhoneNumber(phone)) {
    return parsePhoneNumber(phone).format('E.164');
  }
  return phone;
};

export const hashPhoneNumber = (phone: string) => {
  return sha256(e164PhoneNumber(phone));
};
