// SPDX-License-Identifier: ice License 1.0

import {getHeaders} from '@api/client/getHeaders';
import {ENV} from '@constants/env';
import {checkNetwork} from '@utils/network';
import axios, {AxiosError, AxiosInstance} from 'axios';
import {backOff} from 'exponential-backoff';

import {requestInterceptor} from './interceptors/request';
import {responseInterceptor} from './interceptors/response';

export const DEFAULT_BACK_OFF_OPTIONS = {
  delayFirstAttempt: true,
  jitter: 'full',
  numOfAttempts: 25,
  maxDelay: 1000,
  startingDelay: 10,
  timeMultiple: 5,
  retry: async (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status != null &&
      error.response?.status >= 500
    ) {
      return true;
    }

    /**
     * This may happen when the app comes from background
     * and we perform an api call right away
     * e.g. as a result of handling a deeplink / push notification press
     */
    if (isNetworkError(error)) {
      const isConnected = await checkNetwork();
      return !!isConnected;
    }

    return false;
  },
} as const;

function setupApiClient(clientInstance: AxiosInstance) {
  clientInstance.interceptors.request.use(requestInterceptor.onFulfilled);

  clientInstance.interceptors.response.use(
    undefined,
    responseInterceptor.onRejected(clientInstance),
  );
}

const writeClient = axios.create({
  baseURL: `${ENV.BASE_WRITE_API_URL}`,
  headers: getHeaders(),
});

const readClient = axios.create({
  baseURL: `${ENV.BASE_READ_API_URL}`,
  headers: getHeaders(),
});

setupApiClient(writeClient);
setupApiClient(readClient);

export async function post<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
): Promise<TResponse> {
  const response = await backOff(
    async () => writeClient.post<TResponse>(path, payload),
    backOffOptions,
  );
  return response.data;
}

export async function patch<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
): Promise<TResponse> {
  const response = await backOff(
    async () => writeClient.patch<TResponse>(path, payload),
    backOffOptions,
  );
  return response.data;
}

export async function put<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
): Promise<TResponse> {
  const response = await backOff(
    async () => writeClient.put<TResponse>(path, payload),
    backOffOptions,
  );
  return response.data;
}

export async function get<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number | null | undefined} | null,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
): Promise<TResponse> {
  const response = await backOff(
    async () => readClient.get<TResponse>(path, {params: queryParams}),
    backOffOptions,
  );
  return response.data;
}

export async function del<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number | null | undefined} | null,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
): Promise<TResponse> {
  const response = await backOff(
    async () => writeClient.delete<TResponse>(path, {params: queryParams}),
    backOffOptions,
  );
  return response.data;
}

export const isApiError = (
  error: unknown,
  expectedStatus?: number,
  expectedCode?: string,
): error is AxiosError<{
  code?: string;
  data?: {[key: string]: unknown};
  error?: string;
}> => {
  return (
    axios.isAxiosError(error) &&
    (!expectedStatus || error.response?.status === expectedStatus) &&
    (!expectedCode || error.response?.data.code === expectedCode)
  );
};

export const isNetworkError = (
  error: unknown,
): error is AxiosError<{
  code?: string;
  data?: {[key: string]: unknown};
  error?: string;
}> => {
  return (
    axios.isAxiosError(error) && !error.response && error.code === 'ERR_NETWORK'
  );
};

export const getApiErrorCode = (error: unknown) => {
  return axios.isAxiosError(error) ? error.response?.data.code : null;
};

export const buildFormData = (entity: {[key: string]: unknown}) => {
  const formData = new FormData();
  for (let key in entity) {
    const value = entity[key];
    if (Array.isArray(value)) {
      value.forEach(v => formData.append(key, v));
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !('uri' in value) // {uri: string} - Upload file and it should be sent as is
    ) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  }
  return formData;
};
