// SPDX-License-Identifier: BUSL-1.1

import {getHeaders} from '@api/client/getHeaders';
import {ENV} from '@constants/env';
import axios, {AxiosInstance} from 'axios';
import {backOff} from 'exponential-backoff';

import {handleServiceError} from './ApiServiceErrors';
import {requestInterceptor} from './interceptors/request';
import {responseInterceptor} from './interceptors/response';

const backOffOptions = {
  delayFirstAttempt: true,
  jitter: 'full',
  numOfAttempts: 25,
  maxDelay: 1000,
  startingDelay: 10,
  timeMultiple: 5,
  retry: (error: unknown) => {
    return (
      axios.isAxiosError(error) &&
      error.response?.status != null &&
      error.response?.status >= 500
    );
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
): Promise<TResponse> {
  try {
    const response = await backOff(
      async () => writeClient.post<TResponse>(path, payload),
      backOffOptions,
    );
    return response.data;
  } catch (error) {
    handleServiceError(error);
    throw error;
  }
}

export async function patch<TRequest, TResponse>(
  path: string,
  payload: TRequest,
): Promise<TResponse> {
  try {
    const response = await backOff(
      async () => writeClient.patch<TResponse>(path, payload),
      backOffOptions,
    );
    return response.data;
  } catch (error) {
    handleServiceError(error);
    throw error;
  }
}

export async function put<TRequest, TResponse>(
  path: string,
  payload: TRequest,
): Promise<TResponse> {
  try {
    const response = await backOff(
      async () => writeClient.put<TResponse>(path, payload),
      backOffOptions,
    );
    return response.data;
  } catch (error) {
    handleServiceError(error);
    throw error;
  }
}

export async function get<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number},
): Promise<TResponse> {
  try {
    const response = await backOff(
      async () => readClient.get<TResponse>(path, {params: queryParams}),
      backOffOptions,
    );
    return response.data;
  } catch (error) {
    handleServiceError(error);
    throw error;
  }
}

export async function del<TResponse>(
  path: string,
  queryParams?: {[key: string]: string | number},
): Promise<TResponse> {
  try {
    const response = await backOff(
      async () => writeClient.delete<TResponse>(path, {params: queryParams}),
      backOffOptions,
    );
    return response.data;
  } catch (error) {
    handleServiceError(error);
    throw error;
  }
}
