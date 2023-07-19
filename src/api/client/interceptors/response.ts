// SPDX-License-Identifier: ice License 1.0

import {is4xxApiError} from '@api/client';
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
      case 401: {
        const originalRequest = error.config ?? {};

        if (!originalRequest.pliantRequestRetry) {
          /**
           * This is the first 401 for this request, marking it
           */
          originalRequest.pliantRequestRetry = true;
        } else {
          /**
           * This is the second try (after the tokens are refreshed) and still 401
           */
          return signOutWithError(error);
        }

        const newToken = await refreshTokenConcurrently(error);

        if (!newToken) {
          return signOutWithError(error);
        }

        originalRequest.headers!.Authorization = `Bearer ${newToken.accessToken}`;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  };
}

const signOutWithError = <T>(error: T) => {
  store.dispatch(
    AccountActions.SIGN_OUT.START.create({skipMetadataUpdate: true}),
  );
  return Promise.reject(error);
};

/**
 * In case if multiple requests are failed with 401
 * The first one runs the token refresh
 * The rest are waiting for a result
 */
const refreshTokenConcurrently = async <T>(error: T) => {
  const currentToken = authTokenSelector(store.getState());
  if (!currentToken) {
    return null;
  }

  if (!tokenRefreshPromise) {
    tokenRefreshPromise = refreshAuthToken(currentToken);
  }

  try {
    const newToken = await tokenRefreshPromise;

    if (tokenRefreshPromise) {
      tokenRefreshPromise = null;
      store.dispatch(AccountActions.SET_TOKEN.STATE.create(newToken));
    }

    return newToken;
  } catch (err) {
    /**
     * If the saved refresh token is not valid
     */
    if (is4xxApiError(err)) {
      return null;
    }
    throw error;
  } finally {
    if (tokenRefreshPromise) {
      tokenRefreshPromise = null;
    }
  }
};

export const responseInterceptor = {onRejected};
