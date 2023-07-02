// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
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

          if (!originalRequest.pliantRequestRetry) {
            originalRequest.pliantRequestRetry = true;
          } else {
            /**
             * That is the second try (after the tokens are refreshed) and still 401
             */
            store.dispatch(AccountActions.SIGN_OUT.START.create());
            return;
          }

          /**
           * In case if multiple requests are failed with 401
           * The first one runs the token refresh
           * The rest are waiting for a result
           */
          if (!tokenRefreshPromise) {
            const currentToken = authTokenSelector(store.getState());
            if (!currentToken) {
              store.dispatch(AccountActions.SIGN_OUT.START.create());
              return;
            }
            tokenRefreshPromise = refreshAuthToken(currentToken);
          }

          let newToken;
          try {
            newToken = await tokenRefreshPromise;
            tokenRefreshPromise = null;
          } catch (err) {
            /**
             * If the saved refresh token is not valid
             */
            if (isApiError(err, 403, 'OPERATION_NOT_ALLOWED')) {
              return store.dispatch(AccountActions.SIGN_OUT.START.create());
            }
            throw err;
          }

          /**
           * Token is null if user is already signed out
           */
          if (newToken) {
            originalRequest.headers!.Authorization = `Bearer ${newToken.accessToken}`;
            store.dispatch(AccountActions.SET_TOKEN.STATE.create(newToken));
            return instance(originalRequest);
          }
        }
        break;
    }

    return Promise.reject(error);
  };
}

export const responseInterceptor = {onRejected};
