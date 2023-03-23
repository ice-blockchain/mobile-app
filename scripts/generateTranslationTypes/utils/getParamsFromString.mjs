// SPDX-License-Identifier: ice License 1.0

export const getParamsFromString = input => {
  const params = [...input.matchAll(/{{(\w+)}}/g)].map(match => match[1]);
  return [...new Set(params)];
};
