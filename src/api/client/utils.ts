// SPDX-License-Identifier: BUSL-1.1

import {ApiError} from '@api/client/types';

export const isApiError = (error: unknown): error is ApiError => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    'error' in error
  );
};
