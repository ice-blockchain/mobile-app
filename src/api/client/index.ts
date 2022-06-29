// SPDX-License-Identifier: BUSL-1.1

import {RequestConfig} from '@api/client/apiClientTypes';
import {ENV} from '@constants/env';
import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {handleServiceError} from './ApiServiceErrors';
import {requestInterceptor} from './interceptors/request';
import {responseInterceptor} from './interceptors/response';

function setupApiClient(clientInstance: AxiosInstance) {
  clientInstance.interceptors.request.use(requestInterceptor.onFulfilled);

  clientInstance.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected(clientInstance),
  );
}

const writeClient = axios.create({
  baseURL: `${ENV.BASE_WRITE_API_URL}`,
  headers: {
    'Mobile-App-Version': `${Platform.OS} - ${DeviceInfo.getVersion()}`,
  },
});

const readClient = axios.create({
  baseURL: `${ENV.BASE_READ_API_URL}`,
  headers: {
    'Mobile-App-Version': `${Platform.OS} - ${DeviceInfo.getVersion()}`,
  },
});

setupApiClient(writeClient);
setupApiClient(readClient);

export async function post<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: RequestConfig,
): Promise<TResponse> {
  try {
    const response = await writeClient.post<TResponse>(path, payload, config);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function patch<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: RequestConfig,
): Promise<TResponse> {
  try {
    const response = await writeClient.patch<TResponse>(path, payload, config);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function put<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: RequestConfig,
): Promise<TResponse> {
  try {
    const response = await writeClient.put<TResponse>(path, payload, config);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function get<TResponse>(
  path: string,
  config?: RequestConfig,
): Promise<TResponse> {
  try {
    const response = await readClient.get<TResponse>(path, config);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function del<TResponse>(
  path: string,
  config?: RequestConfig,
): Promise<TResponse> {
  try {
    const response = await writeClient.delete<TResponse>(path, config);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}
