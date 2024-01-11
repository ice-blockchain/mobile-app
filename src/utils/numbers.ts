// SPDX-License-Identifier: ice License 1.0
import compactFormat from 'cldr-compact-number';
import lodashDropRightWhile from 'lodash/dropRightWhile';
import {isIOS} from 'rn-units';

const formatters: {[key: string]: Intl.NumberFormat} = {};

export function formatNumber(
  input: number,
  {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    notation = 'standard',
  }: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  } = {},
) {
  const key = notation + minimumFractionDigits + maximumFractionDigits;

  if (!formatters[key]) {
    formatters[key] = Intl.NumberFormat('en', {
      notation,
      minimumFractionDigits,
      maximumFractionDigits,
    });
  }

  // Compact notation doesn't work on iOS:
  // https://github.com/facebook/hermes/issues/23#issuecomment-1253927200
  // Remove polyfill when implemented
  if (notation === 'compact' && isIOS) {
    if (input < 1000) {
      // polyfill for compact notation doesn't apply formatting for numbers lower than 1000
      // but the build in Intl do the job here
      return formatters[key].format(input);
    }
    return compactFormat(input, 'en', null, {
      significantDigits: minimumFractionDigits,
      minimumFractionDigits,
      maximumFractionDigits,
    });
  }

  return formatters[key].format(input);
}

export function parseNumber(input: string) {
  return parseFloat(input.replace(/,/g, ''));
}

/**
 * Format string with a number to be exactly with "fractionDigits" decimals
 * 1,234,567.123456789 -> 1,234,567.12
 * 1,234,567.1 -> 1,234,567.10
 * 1234567.1 -> 1,234,567.10
 */
export function formatNumberString(
  input: string,
  {
    minimumFractionDigits,
    maximumFractionDigits,
  }: {
    minimumFractionDigits: number;
    maximumFractionDigits: number;
  } = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
) {
  const [whole, decimals] = input.split('.');

  /**
   * Remove all non-numbers except '+' and '-'.
   * Add ',' for every 3 digits
   */
  const formattedWhole = whole
    .replace(/[^0-9+-]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (maximumFractionDigits === 0) {
    return formattedWhole;
  }

  const formattedDecimals = lodashDropRightWhile(
    (decimals ?? '')
      .substring(0, maximumFractionDigits)
      .padEnd(minimumFractionDigits, '0'),
    (value, index) => value === '0' && index >= minimumFractionDigits,
  ).join('');

  return formattedWhole + (formattedDecimals ? `.${formattedDecimals}` : '');
}

/**
 * Removes digits if they are 0.
 * 178.55 -> 178.55
 * 178.50 -> 178.50
 * 178.00 -> 178
 */
export function removeZeroDigits(input: string) {
  return input.replace(/\.0+$/, '');
}
