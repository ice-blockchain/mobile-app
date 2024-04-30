// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {ENV} from '@constants/env';
import {AnyAction} from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react-native';
import {store} from '@store/configureStore';
import {userSelector} from '@store/modules/Account/selectors';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import * as React from 'react';
import {LogBox} from 'react-native';

/**
 * We don't use state persistence or deep links to the screen which accepts functions in params,
 * so the warning doesn't affect us and we can safely ignore it
 * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
 */
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: ENV.SENTRY_KEY,
  enabled: !__DEV__,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
  tracesSampleRate: 0.2,
});

export const loggingReduxEnhancer = Sentry.createReduxEnhancer({
  stateTransformer: () => null,
  actionTransformer: (action: AnyAction) => {
    // omit payload cuz it can contain private data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {payload, ...strippedAction} = action;
    return strippedAction;
  },
});

export function LoggingWrapper(app: React.ComponentType) {
  return Sentry.wrap(app);
}

export function logError(error: unknown, extra: Record<string, unknown> = {}) {
  if (__DEV__) {
    console.error(
      'logError',
      getErrorMessage(error),
      error,
      '\n\nstack:',
      checkProp(error, 'stack') && error.stack,
      extra,
    );
  } else {
    const user = userSelector(store.getState());
    Sentry.withScope(function (scope) {
      if (user) {
        scope.setUser({
          id: user.id,
          username: user.username,
        });
      } else {
        scope.setUser(null);
      }
      Sentry.captureException(
        error,
        isApiError(error)
          ? {
              extra: {responseData: error.response?.data, ...extra},
              tags: {api: error.response?.status},
            }
          : {extra},
      );
    });
  }
}
