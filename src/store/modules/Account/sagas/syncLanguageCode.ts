// SPDX-License-Identifier: ice License 1.0

import {getAuthLanguageCode, setAuthLanguageCode} from '@services/auth';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getLocale, setLocale} from '@translations/i18n';
import {call, SagaReturnType, select} from 'redux-saga/effects';

/**
 * Check user.language property and react on locale change
 */
export function* syncLanguageCodeSaga() {
  yield call(setAuthLanguageCode, getLocale());

  while (true) {
    yield call(waitForSelector, state => {
      const appLocale = appLocaleSelector(state);

      return appLocale !== getLocale();
    });

    const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    setLocale(locale);

    /**
     * Sync locale with auth service
     */
    if (locale !== getAuthLanguageCode()) {
      yield call(setAuthLanguageCode, locale);
    }
  }
}
