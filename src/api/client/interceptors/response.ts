// SPDX-License-Identifier: ice License 1.0

import {refreshAuthToken} from '@services/auth';
import {store} from '@store/configureStore';
import {AccountActions} from '@store/modules/Account/actions';
import {authTokenSelector} from '@store/modules/Account/selectors';
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
          const originalRequest = error.config ?? {};
          const currentToken = authTokenSelector(store.getState());

          if (!originalRequest.pliantRequestRetry && currentToken) {
            const newToken = await refreshAuthToken(currentToken);

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
