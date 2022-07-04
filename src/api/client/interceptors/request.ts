// SPDX-License-Identifier: BUSL-1.1

import {store} from '@store/configureStore';
import {authTokenSelector} from '@store/modules/Auth/selectors';
import {AxiosRequestConfig} from 'axios';

async function onFulfilled(config: AxiosRequestConfig) {
  if (!config.headers?.Authorization) {
    const accessToken = authTokenSelector(store.getState());

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  return config;
}

export const requestInterceptor = {onFulfilled};
