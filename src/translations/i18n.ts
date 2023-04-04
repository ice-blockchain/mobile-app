// SPDX-License-Identifier: ice License 1.0

import {localeConfig, SupportedLocale} from '@translations/localeConfig';
import {Translations} from '@translations/locales/en.json';
// eslint-disable-next-line no-restricted-imports
import {I18n, TranslateOptions} from 'i18n-js';
import {I18nManager} from 'react-native';
import RNLocalize from 'react-native-localize';
// eslint-disable-next-line no-restricted-imports
import reactStringReplace from 'react-string-replace';

const DEFAULT_LOCALE: SupportedLocale = 'en';

const i18n = new I18n();

export const availableLocales = Object.keys(
  localeConfig,
) as Array<SupportedLocale>;

export const locale = RNLocalize.findBestAvailableLanguage(availableLocales);

export const deviceMainLocale = RNLocalize.getLocales()[0];

i18n.defaultLocale = DEFAULT_LOCALE;

const initialLocale =
  locale?.languageTag ||
  (i18n.defaultLocale as Extract<SupportedLocale, typeof DEFAULT_LOCALE>);

i18n.locale = initialLocale;
i18n.enableFallback = true;
i18n.translations = {[initialLocale]: localeConfig[initialLocale].translations};

export default i18n;

export function t<K extends keyof Translations, O extends Translations[K]>(
  ...args: O extends null
    ? Parameters<(key: K, options?: TranslateOptions) => string>
    : Parameters<(key: K, options: O & TranslateOptions) => string>
) {
  return i18n.t(args[0], args[1]);
}

export const tagRegex = (tag: string, isSingular = true) => {
  if (isSingular) {
    return `[[:${tag}]]`;
  } else {
    return new RegExp(
      `\\[\\[:${tag}\\]\\]([\\s\\S]+?)\\[\\[\\/:${tag}\\]\\](?!.*\\[\\[\\[:${tag}\\])`,
    );
  }
};

export const replaceString = reactStringReplace;

export const setLocale = (newLocale: SupportedLocale) => {
  i18n.store({[newLocale]: localeConfig[newLocale].translations});
  i18n.locale = newLocale;
};

export const getLocale = (): SupportedLocale => {
  return i18n.locale as SupportedLocale;
};

export const isRTL: boolean = I18nManager.isRTL;
