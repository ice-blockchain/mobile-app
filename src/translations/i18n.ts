// SPDX-License-Identifier: BUSL-1.1

// eslint-disable-next-line no-restricted-imports
import i18n, {TranslateOptions} from 'i18n-js';
import RNLocalize from 'react-native-localize';

const locales = require('@translations/translations.json');

export const availableLocales = Object.keys(locales);

export const locale = RNLocalize.findBestAvailableLanguage(availableLocales);

i18n.defaultLocale = 'en-GB';
i18n.locale = locale?.languageTag || i18n.defaultLocale;
i18n.fallbacks = true;
i18n.translations = locales;
i18n.missingTranslation = (scope: string, options?: TranslateOptions) =>
  translate(scope, {...options, locale: i18n.defaultLocale});

export default i18n;

export const translate = (scope: string, options?: TranslateOptions) =>
  i18n.t(scope, options);
