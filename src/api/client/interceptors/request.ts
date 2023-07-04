// SPDX-License-Identifier: ice License 1.0

import {store} from '@store/configureStore';
import {
  appLocaleSelector,
  authTokenSelector,
  userMetadataSelector,
} from '@store/modules/Account/selectors';
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

  if (!config.headers?.['X-Language']) {
    const appLocale = appLocaleSelector(store.getState());
    config.headers = {
      ...config.headers,
      'X-Language': appLocale,
    };
  }

  if (!config.headers?.['X-Account-Metadata']) {
    const metadata = userMetadataSelector(store.getState());

    if (metadata) {
      config.headers = {
        ...config.headers,
        'X-Account-Metadata': metadata,
      };
    }
  }

  return config;
}

export const requestInterceptor = {onFulfilled};
