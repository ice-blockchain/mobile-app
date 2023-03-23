// SPDX-License-Identifier: ice License 1.0
import compactFormat from 'cldr-compact-number';
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
  // Compact notation doesn't work on iOS:
  // https://github.com/facebook/hermes/issues/23#issuecomment-1253927200
  // Remove polyfill when implemented
  if (notation === 'compact' && isIOS) {
    return compactFormat(input, 'en', null, {
      significantDigits: minimumFractionDigits,
      minimumFractionDigits,
      maximumFractionDigits,
    });
  }

  const key = notation + minimumFractionDigits + maximumFractionDigits;

  if (!formatters[key]) {
    formatters[key] = Intl.NumberFormat('en', {
      notation,
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
export function formatNumberString(input: string, fractionDigits: number = 2) {
  const [whole, decimals] = input.split('.');

  /**
   * Remove all non-numbers except '+' and '-'.
   * Add ',' for every 3 digits
   */
  const formattedWhole = whole
    .replace(/[^0-9+-]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!fractionDigits) {
    return formattedWhole;
  }

  return (
    formattedWhole +
    '.' +
    (decimals ?? '').substring(0, fractionDigits).padEnd(fractionDigits, '0')
  );
}
