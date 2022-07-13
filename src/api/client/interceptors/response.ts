// SPDX-License-Identifier: BUSL-1.1

import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

function onRejected(instance: AxiosInstance) {
  return async (error: {
    message: string;
    request?: unknown;
    response?: AxiosResponse;
    config?: AxiosRequestConfig & {
      pliantRequestRetry?: boolean;
    };
    isAxiosError: boolean;
  }) => {
    switch (error.response?.status) {
      case 401:
        {
          const originalRequest = error.config;

          // TODO: handle authorization
          const isSignedIn = true;
          // const isSignedIn = AuthSelectors.isSignedIn(
          //   StoreConfig.store.getState(),
          // );

          if (
            isSignedIn &&
            originalRequest &&
            !originalRequest.pliantRequestRetry
          ) {
            // const accessToken = ''; //TODO: get from storage

            originalRequest.pliantRequestRetry = true;
            // originalRequest.headers.Authorization = `${accessToken}`;

            return instance(originalRequest);
          }
        }
        break;
    }

    return Promise.reject(error);
  };
}

export const responseInterceptor = {onRejected};
