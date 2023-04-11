// SPDX-License-Identifier: ice License 1.0

import {getAuthLanguageCode, setAuthLanguageCode} from '@services/auth';
import {setCalendarLocale} from '@services/calendar';
import {setDayjsLocale} from '@services/dayjs';
import {
  appLocaleSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {LanguageActions} from '@store/modules/Locale/actions';
import {
  lastUsedInAppLocaleSelector,
  lastUsedPhoneLocaleSelector,
} from '@store/modules/Locale/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getLocale, isRTL, setLocale} from '@translations/i18n';
import {localeConfig} from '@translations/localeConfig';
import {I18nManager} from 'react-native';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

/**
 * Check user.language property and react on locale change
 */
export function* syncLanguageCodeSaga() {
  yield call(setAuthLanguageCode, getLocale());

  const lastUsedPhoneLocale: SagaReturnType<
    typeof lastUsedPhoneLocaleSelector
  > = yield select(lastUsedPhoneLocaleSelector);

  if (lastUsedPhoneLocale !== getLocale()) {
    yield put(
      LanguageActions.UPDATE_LAST_USED_PHONE_LOCALE.STATE.create(getLocale()),
    );
  }

  if (localeConfig[getLocale()].isRTL !== isRTL) {
    I18nManager.forceRTL(localeConfig[getLocale()].isRTL);
  }
  while (true) {
    yield call(waitForSelector, state => {
      const appLocale = appLocaleSelector(state);

      return appLocale !== getLocale();
    });

    const user: SagaReturnType<typeof userSelector> = yield select(
      userSelector,
    );

    const lastUsedInAppLocale: SagaReturnType<
      typeof lastUsedInAppLocaleSelector
    > = yield select(lastUsedInAppLocaleSelector);

    const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    const currentLocale = !user
      ? lastUsedInAppLocale
        ? lastUsedInAppLocale
        : locale
      : locale;

    setLocale(currentLocale);

    setDayjsLocale(currentLocale);

    setCalendarLocale(currentLocale);

    I18nManager.forceRTL(localeConfig[currentLocale].isRTL);

    /**
     * Sync locale with auth service
     */
    if (locale !== getAuthLanguageCode()) {
      yield call(setAuthLanguageCode, locale);
    }
  }
}
