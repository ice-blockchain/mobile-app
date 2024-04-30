// SPDX-License-Identifier: ice License 1.0

import {backOffWrapper, DEFAULT_BACK_OFF_OPTIONS} from '@api/client/backOff';
import {getHeaders} from '@api/client/getHeaders';
import {ENV} from '@constants/env';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import {requestInterceptor} from './interceptors/request';
import {responseInterceptor} from './interceptors/response';

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
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const response = await backOffWrapper(
    async () => writeClient.post<TResponse>(path, payload, config),
    backOffOptions,
  );
  return response.data;
}

export async function patch<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const response = await backOffWrapper(
    async () => writeClient.patch<TResponse>(path, payload, config),
    backOffOptions,
  );
  return response.data;
}

export async function put<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const response = await backOffWrapper(
    async () => writeClient.put<TResponse>(path, payload, config),
    backOffOptions,
  );
  return response.data;
}

export async function get<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number | null | undefined} | null,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> {
  const response = await backOffWrapper(
    async () =>
      readClient.get<TResponse>(path, {params: queryParams, ...config}),
    backOffOptions,
  );
  return response;
}

export async function del<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number | null | undefined} | null,
  backOffOptions = DEFAULT_BACK_OFF_OPTIONS,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const response = await backOffWrapper(
    async () =>
      writeClient.delete<TResponse>(path, {params: queryParams, ...config}),
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

export const is4xxApiError = (error: unknown) => {
  return (
    axios.isAxiosError(error) &&
    error.response?.status &&
    error.response.status >= 400 &&
    error.response.status < 500
  );
};

export const is5xxApiError = (error: unknown) => {
  return (
    axios.isAxiosError(error) &&
    error.response?.status &&
    error.response.status >= 500
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
      if (value.length === 0 && key === 'hiddenProfileElements') {
        formData.append('clearHiddenProfileElements', true);
      } else {
        value.forEach(v => formData.append(key, v));
      }
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !('uri' in value) // {uri: string} - Upload file and it should be sent as is
    ) {
      formData.append(key, JSON.stringify(value));
    } else {
      if (!value && key === 'miningBlockchainAccountAddress') {
        formData.append('clearMiningBlockchainAccountAddress', true);
      } else {
        formData.append(key, value);
      }
    }
  }
  return formData;
};
