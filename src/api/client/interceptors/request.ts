// SPDX-License-Identifier: ice License 1.0

import {store} from '@store/configureStore';
import {authTokenSelector} from '@store/modules/Account/selectors';
import {AxiosRequestConfig} from 'axios';

async function onFulfilled(config: AxiosRequestConfig) {
  if (!config.headers?.Authorization) {
    const token = authTokenSelector(store.getState());

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.accessToken}`,
      };
    }
  }

  if (config.data instanceof FormData) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    };
    config.transformRequest = (data: FormData) => data;
  }

  return config;
}

export const requestInterceptor = {onFulfilled};
