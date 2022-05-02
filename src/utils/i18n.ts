// SPDX-License-Identifier: BUSL-1.1

import RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

const locales = {
  en: require('@translations/ice-en-GB.json'),
};

export const availableLocales = Object.keys(locales);

export const locale = RNLocalize.findBestAvailableLanguage(availableLocales);

i18n.locale = locale?.languageTag || 'en';
i18n.fallbacks = true;
i18n.translations = locales;

export default i18n;

export const translate = (key: string, options?: any) => i18n.t(key, options);
