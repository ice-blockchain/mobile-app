// SPDX-License-Identifier: BUSL-1.1

import {magic} from '@services/magicLink';
import {store} from '@store/configureStore';
import {AuthActions} from '@store/modules/Auth/actions';
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

          if (!originalRequest.pliantRequestRetry) {
            const token = await magic.user.getIdToken();

            originalRequest.pliantRequestRetry = true;
            originalRequest.headers!.Authorization = `Bearer ${token}`;
            store.dispatch(AuthActions.SET_TOKEN.STATE.create(token));
            return instance(originalRequest);
          } else {
            store.dispatch(AuthActions.SIGN_OUT.START.create());
          }
        }
        break;
    }

    return Promise.reject(error);
  };
}

export const responseInterceptor = {onRejected};
