// SPDX-License-Identifier: BUSL-1.1

import axios, {AxiosError} from 'axios';

export const isApiError = (
  error: unknown,
  expectedStatus?: number,
  expectedCode?: string,
): error is AxiosError => {
  return (
    axios.isAxiosError(error) &&
    (!expectedStatus || error.response?.status === expectedStatus) &&
    (!expectedCode || error.response?.data.code === expectedCode)
  );
};
