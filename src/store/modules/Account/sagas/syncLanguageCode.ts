// SPDX-License-Identifier: ice License 1.0

import {getAuthLanguageCode, setAuthLanguageCode} from '@services/auth';
import {setCalendarLocale} from '@services/calendar';
import {setDayjsLocale} from '@services/dayjs';
import {
  appLocaleSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getLocale, isRTL, setLocale} from '@translations/i18n';
import {localeConfig} from '@translations/localeConfig';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {call, SagaReturnType, select} from 'redux-saga/effects';

/**
 * Check user.language property and react on locale change
 */
export function* syncLanguageCodeSaga() {
  yield call(setAuthLanguageCode, getLocale());

  while (true) {
    yield call(waitForSelector, state => {
      const appLocale = appLocaleSelector(state);
      const user = userSelector(state);

      if (localeConfig[appLocale].isRTL !== isRTL) {
        I18nManager.forceRTL(localeConfig[appLocale].isRTL);
        !user && RNRestart.restart();
      }

      return appLocale !== getLocale();
    });

    const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    setLocale(locale);

    setDayjsLocale(locale);

    setCalendarLocale(locale);

    if (localeConfig[locale].isRTL !== isRTL) {
      I18nManager.forceRTL(localeConfig[locale].isRTL);
    }

    /**
     * Sync locale with auth service
     */
    if (locale !== getAuthLanguageCode()) {
      yield call(setAuthLanguageCode, locale);
    }
  }
}
