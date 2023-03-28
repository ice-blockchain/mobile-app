// SPDX-License-Identifier: ice License 1.0

import {flags} from '@flags';
import {Translations} from '@translations/locales/en.json';

export type SupportedLocale = 'en';

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
} as const;
