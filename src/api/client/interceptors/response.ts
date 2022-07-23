// SPDX-License-Identifier: BUSL-1.1

import {magic} from '@services/magicLink';
import {isAuthorizedSelector} from '@store/modules/Auth/selectors';
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {useSelector} from 'react-redux';

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

          const isAuthorized = useSelector(isAuthorizedSelector);
          if (isAuthorized && originalRequest) {
            const refreshedToken = await magic.user.getIdToken();

            originalRequest.pliantRequestRetry = true;
            originalRequest.headers!.Authorization = `Bearer ${refreshedToken}`;

            return instance(originalRequest);
          }
        }
        break;
    }

    return Promise.reject(error);
  };
}

export const responseInterceptor = {onRejected};
