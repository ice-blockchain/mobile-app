// SPDX-License-Identifier: ice License 1.0

import {calendarLocales} from '@services/calendar/calendarLocales';
import {SupportedLocale} from '@translations/localeConfig';
import {LocaleConfig} from 'react-native-calendars';

export const setCalendarLocale = (locale: SupportedLocale) => {
  LocaleConfig.locales[locale] = calendarLocales[locale];
  LocaleConfig.defaultLocale = locale;
};
