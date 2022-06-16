// SPDX-License-Identifier: BUSL-1.1

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
