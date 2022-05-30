// SPDX-License-Identifier: BUSL-1.1

import {RequestConfig} from '@api/client/apiClientTypes';
import {ENV} from '@constants/env';
import {magicLink} from '@services/magicLink';
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

const client = axios.create({
  baseURL: `${ENV.BASE_URL}/api`,
  headers: {
    'Mobile-App-Version': `${Platform.OS} - ${DeviceInfo.getVersion()}`,
    Authorization: `Bearer ${magicLink.token}`,
  },
});

setupApiClient(client);

export async function post<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: RequestConfig,
): Promise<TResponse> {
  try {
    const response = config
      ? await client.post<TResponse>(path, payload, config)
      : await client.post<TResponse>(path, payload);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function patch<TRequest, TResponse>(
  path: string,
  payload: TRequest,
): Promise<TResponse> {
  try {
    const response = await client.patch<TResponse>(path, payload);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function put<TRequest, TResponse>(
  path: string,
  payload: TRequest,
): Promise<TResponse> {
  try {
    const response = await client.put<TResponse>(path, payload);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function get<TResponse>(path: string): Promise<TResponse> {
  try {
    const response = await client.get<TResponse>(path);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function deleteRequest<TResponse>(
  path: string,
): Promise<TResponse> {
  try {
    const response = await axios.delete<TResponse>(path);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}
