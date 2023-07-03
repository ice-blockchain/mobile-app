// SPDX-License-Identifier: ice License 1.0

import {flags} from '@flags';
import {Translations} from '@translations/locales/en.json';

/**
 * uncomment locales which you add then take look @services/dayjs/index.ts and @services/dayjs/calendarLocales.ts
 */

export type SupportedLocale =
  | 'en'
  | 'de'
  | 'az'
  | 'gu'
  | 'id'
  | 'it'
  | 'mr'
  | 'pl'
  | 'th'
  | 'vi'
  | 'zh'
  | 'hi'
  | 'bn';

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
  az: {
    get translations() {
      return require('./locales/az.json');
    },
    name: 'Azerbaijani',
    flag: flags.az,
    isRTL: false,
  },
  bn: {
    get translations() {
      return require('./locales/bn.json');
    },
    name: 'Bengali',
    flag: flags.in,
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
  gu: {
    get translations() {
      return require('./locales/gu.json');
    },
    name: 'Gujarati',
    flag: flags.in,
    isRTL: false,
  },
  hi: {
    get translations() {
      return require('./locales/hi.json');
    },
    name: 'Hindi',
    flag: flags.in,
    isRTL: false,
  },
  id: {
    get translations() {
      return require('./locales/id.json');
    },
    name: 'Indonesian',
    flag: flags.id,
    isRTL: false,
  },
  it: {
    get translations() {
      return require('./locales/it.json');
    },
    name: 'Italian',
    flag: flags.it,
    isRTL: false,
  },
  mr: {
    get translations() {
      return require('./locales/mr.json');
    },
    name: 'Marathi',
    flag: flags.in,
    isRTL: false,
  },
  pl: {
    get translations() {
      return require('./locales/pl.json');
    },
    name: 'Polish',
    flag: flags.pl,
    isRTL: false,
  },
  th: {
    get translations() {
      return require('./locales/th.json');
    },
    name: 'Thai',
    flag: flags.th,
    isRTL: false,
  },
  vi: {
    get translations() {
      return require('./locales/vi.json');
    },
    name: 'Vietnamese',
    flag: flags.vn,
    isRTL: false,
  },
  zh: {
    get translations() {
      return require('./locales/zh.json');
    },
    name: 'Simplified Chinese',
    flag: flags.cn,
    isRTL: false,
  },
} as const;
