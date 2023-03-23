// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import {getLocale} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import duration from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(duration);
dayjs.extend(utc);

export const setDayjsLocale = (locale: SupportedLocale) => {
  // https://day.js.org/docs/en/installation/typescript#locale-and-plugin-import
  switch (locale) {
    case 'en':
      require('dayjs/locale/en');
      break;

    case 'ro':
      require('dayjs/locale/ro');
      break;

    case 'de':
      require('dayjs/locale/de');
      break;

    default:
      logError(`Setup '${locale}' locale properly for 'dayjs'`);
  }

  dayjs.locale(locale);
};

setDayjsLocale(getLocale());

export {dayjs};
