// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
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

/**
 * uncomment locales which have been added
 */

export const setDayjsLocale = (locale: SupportedLocale) => {
  // https://day.js.org/docs/en/installation/typescript#locale-and-plugin-import
  switch (locale) {
    case 'fa':
      require('dayjs/locale/fa');
      break;
    case 'ur':
      require('dayjs/locale/ur');
      break;
    case 'he':
      require('dayjs/locale/he');
      break;
    case 'ar':
      require('dayjs/locale/ar');
      break;
    case 'en':
      require('dayjs/locale/en');
      break;
    case 'de':
      require('dayjs/locale/de');
      break;
    case 'az':
      require('dayjs/locale/az');
      break;
    case 'gu':
      require('dayjs/locale/gu');
      break;
    case 'id':
      require('dayjs/locale/id');
      break;
    case 'it':
      require('dayjs/locale/it');
      break;
    case 'mr':
      require('dayjs/locale/mr');
      break;
    case 'pl':
      require('dayjs/locale/pl');
      break;
    case 'th':
      require('dayjs/locale/th');
      break;
    case 'vi':
      require('dayjs/locale/vi');
      break;
    case 'zh':
      require('dayjs/locale/zh');
      break;
    case 'zh-hant':
      require('dayjs/locale/zh-hk');
      break;
    case 'hi':
      require('dayjs/locale/hi');
      break;
    case 'bn':
      require('dayjs/locale/bn');
      break;
    case 'bg':
      require('dayjs/locale/bg');
      break;
    case 'cs':
      require('dayjs/locale/cs');
      break;
    case 'el':
      require('dayjs/locale/el');
      break;
    case 'es':
      require('dayjs/locale/es');
      break;
    case 'fr':
      require('dayjs/locale/fr');
      break;
    case 'hu':
      require('dayjs/locale/hu');
      break;
    case 'ja':
      require('dayjs/locale/ja');
      break;
    case 'ko':
      require('dayjs/locale/ko');
      break;
    case 'ms':
      require('dayjs/locale/ms');
      break;
    case 'nb':
      require('dayjs/locale/nb');
      break;
    case 'nn':
      require('dayjs/locale/nn');
      break;
    case 'pt':
      require('dayjs/locale/pt');
      break;
    case 'ro':
      require('dayjs/locale/ro');
      break;
    case 'te':
      require('dayjs/locale/te');
      break;
    case 'uk':
      require('dayjs/locale/uk');
      break;
    case 'pa':
      require('dayjs/locale/pa-in');
      break;
    case 'af':
      require('dayjs/locale/af');
      break;
    case 'am':
      require('dayjs/locale/am');
      break;
    case 'kn':
      require('dayjs/locale/kn');
      break;
    case 'ru':
      require('dayjs/locale/ru');
      break;
    case 'sk':
      require('dayjs/locale/sk');
      break;
    case 'sl':
      require('dayjs/locale/sl');
      break;
    case 'sq':
      require('dayjs/locale/sq');
      break;
    case 'sv':
      require('dayjs/locale/sv');
      break;
    case 'tr':
      require('dayjs/locale/tr');
      break;
    default:
      logError(`Setup '${locale}' locale properly for 'dayjs'`);
  }

  dayjs.locale(locale);
};

export {dayjs};
