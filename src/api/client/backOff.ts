// SPDX-License-Identifier: ice License 1.0

import {isNetworkError} from '@api/client';
import {checkNetwork} from '@utils/network';
import axios from 'axios';
import {backOff} from 'exponential-backoff';
import {AppState} from 'react-native';

export const DEFAULT_BACK_OFF_OPTIONS = {
  delayFirstAttempt: false,
  jitter: 'none',
  numOfAttempts: 25,
  maxDelay: 10000,
  startingDelay: 1000,
  timeMultiple: 5,
  retry: async (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status != null &&
      error.response?.status >= 500
    ) {
      return true;
    }

    /**
     * This may happen when the app comes from background
     * and we perform an api call right away
     * e.g. as a result of handling a deeplink / push notification press
     */
    if (isNetworkError(error)) {
      const isConnected = await checkNetwork();
      return !!isConnected;
    }

    return false;
  },
} as const;

/**
 * backOff relies on setTimeout and in background setTimeout works not as expected
 * https://reactnative.dev/docs/headless-js-android#caveats
 * So if app is not in the active state (not in foreground),
 * using requests directly, without delays and retries
 */
export const backOffWrapper: typeof backOff = (request, options) => {
  if (AppState.currentState === 'active') {
    return backOff(request, options);
  }
  return request();
};
