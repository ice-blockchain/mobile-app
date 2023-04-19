// SPDX-License-Identifier: ice License 1.0

import {appLocaleSelector} from '@store/modules/Account/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {isRTL} from '@translations/i18n';
import {localeConfig} from '@translations/localeConfig';
import {I18nManager} from 'react-native';
import {call, SagaReturnType, select} from 'redux-saga/effects';

/**
 * Check user.language property and react on locale change
 */
export function* syncRTLSaga() {
  while (true) {
    yield call(waitForSelector, state => {
      const appLocale = appLocaleSelector(state);

      return localeConfig[appLocale].isRTL !== isRTL;
    });

    const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    I18nManager.forceRTL(localeConfig[locale].isRTL);
  }
}
