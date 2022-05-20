// SPDX-License-Identifier: BUSL-1.1

import {RequestConfig} from '@api/types';
import axios from 'src/api/utils/axios';
import {handleServiceError} from './ApiServiceErrors';

export async function post<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: RequestConfig,
): Promise<TResponse> {
  try {
    const response = config
      ? await axios.post<TResponse>(path, payload, config)
      : await axios.post<TResponse>(path, payload);
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
    const response = await axios.patch<TResponse>(path, payload);
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
    const response = await axios.put<TResponse>(path, payload);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}

export async function get<TResponse>(path: string): Promise<TResponse> {
  try {
    const response = await axios.get<TResponse>(path);
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
  return {} as TResponse;
}
