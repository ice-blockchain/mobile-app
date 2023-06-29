// SPDX-License-Identifier: ice License 1.0

import {refreshAuthToken} from '@services/auth';
import {AuthToken} from '@services/auth/types';
import {store} from '@store/configureStore';
import {AccountActions} from '@store/modules/Account/actions';
import {authTokenSelector} from '@store/modules/Account/selectors';
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

let tokenRefreshPromise: Promise<AuthToken | null> | null = null;

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
          const originalRequest = error.config ?? {};
          const currentToken = authTokenSelector(store.getState());

          if (!originalRequest.pliantRequestRetry && currentToken) {
            if (!tokenRefreshPromise) {
              /**
               * In case if multiple requests are failed with 401
               * The first one runs the token refresh
               * The rest are waiting for a result
               */
              tokenRefreshPromise = refreshAuthToken(currentToken);
            }

            const newToken = await tokenRefreshPromise;

            tokenRefreshPromise = null;

            /**
             * token is null if user is already signed out
             */
            if (newToken) {
              originalRequest.pliantRequestRetry = true;
              originalRequest.headers!.Authorization = `Bearer ${newToken.accessToken}`;
              store.dispatch(AccountActions.SET_TOKEN.STATE.create(newToken));
              return instance(originalRequest);
            }
          } else {
            store.dispatch(AccountActions.SIGN_OUT.START.create());
          }
        }
        break;
    }

    return Promise.reject(error);
  };
}

export const responseInterceptor = {onRejected};
