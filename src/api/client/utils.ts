// SPDX-License-Identifier: BUSL-1.1

import axios from 'axios';

export const isApiError = (
  error: unknown,
  expectedStatus?: number,
  expectedCode?: string,
): boolean => {
  return (
    axios.isAxiosError(error) &&
    (!expectedStatus || error.response?.status === expectedStatus) &&
    (!expectedCode || error.response?.data.code === expectedCode)
  );
};
