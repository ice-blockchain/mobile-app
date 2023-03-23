// SPDX-License-Identifier: ice License 1.0

export const PARAMS_TYPE = 'number | string';
export const COUNT_TYPE = 'number';

export const buildParamsType = params => {
  return params.reduce(
    (result, param) => ({...(result ?? {}), [param]: PARAMS_TYPE}),
    null,
  );
};
