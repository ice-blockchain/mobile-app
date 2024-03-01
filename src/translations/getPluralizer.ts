// SPDX-License-Identifier: ice License 1.0

import {SupportedLocale} from '@translations/localeConfig';
import {MakePlural} from 'i18n-js/typings';
import * as plural from 'make-plural';

export const getPluralizer = (locale: SupportedLocale): MakePlural => {
  if (locale === 'zh-hant') {
    return plural.zh;
  }
  return plural[locale];
};
