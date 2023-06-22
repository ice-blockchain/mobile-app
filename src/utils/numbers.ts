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
