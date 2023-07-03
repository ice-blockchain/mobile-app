// SPDX-License-Identifier: ice License 1.0

import {appLocaleSelector} from '@store/modules/Account/selectors';
import {isRTL} from '@translations/i18n';
import {localeConfig} from '@translations/localeConfig';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {SagaReturnType, select} from 'redux-saga/effects';

/**
 * Check the locale change and restart the app
 */
export function* syncRtlSaga() {
  const appLocale: SagaReturnType<typeof appLocaleSelector> = yield select(
    appLocaleSelector,
  );

  if (localeConfig[appLocale].isRTL !== isRTL) {
    I18nManager.forceRTL(localeConfig[appLocale].isRTL);
    RNRestart.restart();
    return;
  }
}
