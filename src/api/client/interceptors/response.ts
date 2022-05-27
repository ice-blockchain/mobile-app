// SPDX-License-Identifier: BUSL-1.1

import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

// import StoreConfig from 'src/configureStore'; //TODO: configure redux store
// import AuthSelectors from 'src/modules/Auth/selectors'; //TODO: configure redux store

function onFulfilled(response: AxiosResponse) {
  return response.data;
}

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
    const errorData =
      error?.response?.data || error.message || error?.response?.statusText;

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

    return Promise.reject(errorData || error);
  };
}

export const responseInterceptor = {onFulfilled, onRejected};
