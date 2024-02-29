// SPDX-License-Identifier: ice License 1.0

import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {LogBox} from 'react-native';

/**
 * We don't use state persistence or deep links to the screen which accepts functions in params,
 * so the warning doesn't affect us and we can safely ignore it
 * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
 */
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
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
  }
}
