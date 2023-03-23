// SPDX-License-Identifier: ice License 1.0

import {flags} from '@flags';
import {Translations} from '@translations/locales/en.json';

export type SupportedLocale = 'en' | 'ro' | 'de';

type LocalConfig = {
  [key in SupportedLocale]: {
    readonly translations: Translations;
    name: string;
    flag: number;
    isRTL: boolean;
  };
};

export const localeConfig: LocalConfig = {
  en: {
    get translations() {
      return require('./locales/en.json');
    },
    name: 'English',
    flag: flags.us,
    isRTL: false,
  },
  ro: {
    get translations() {
      return require('./locales/ro.json');
    },
    name: 'Romanian',
    flag: flags.ro,
    isRTL: false,
  },
  de: {
    get translations() {
      return require('./locales/de.json');
    },
    name: 'German',
    flag: flags.de,
    isRTL: false,
  },
} as const;
