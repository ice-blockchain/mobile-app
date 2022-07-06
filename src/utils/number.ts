// SPDX-License-Identifier: BUSL-1.1

import {ICountryCode} from '@constants/countries';
import {CountryCode, formatIncompletePhoneNumber} from 'libphonenumber-js';

/**
 * 1428156 -> 1,428,156
 */
export const formatNumber = (input: number | string, step = 3) => {
  if (input.toString().length === 0) {
    return null;
  }
  const figures = input.toString().split('');
  const insertsCount = Math.floor((figures.length - 1) / step);
  for (let i = 0; i < insertsCount; i++) {
    figures.splice(figures.length - step - step * i, 0, ',');
  }
  return figures.join('');
};

export const formatPhoneNumberForInput = (v: string, country: ICountryCode) => {
  const isoCode = country.isoCode as CountryCode;
  const phoneNumberWithCountryCode = formatIncompletePhoneNumber(
    `${country.iddCode}${v}`,
    isoCode,
  );
  const splitedPhoneNumber = phoneNumberWithCountryCode.split(' ');
  if (splitedPhoneNumber.length > 2) {
    return `(${splitedPhoneNumber[1]}) ${splitedPhoneNumber
      .slice(2)
      .join(' ')}`;
  } else {
    return splitedPhoneNumber.slice(1).join(' ');
  }
};
