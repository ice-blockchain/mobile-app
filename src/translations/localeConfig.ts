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
  | 'ar'
  | 'id'
  | 'it'
  | 'mr'
  | 'pl'
  | 'th'
  | 'vi'
  | 'zh'
  | 'hi'
  | 'bn'
  | 'bg'
  | 'cs'
  | 'el'
  | 'es'
  | 'fr'
  | 'hu'
  | 'ja'
  | 'ko'
  | 'ms'
  | 'nb'
  | 'nn'
  | 'pt'
  | 'ro'
  | 'te'
  | 'uk';

export type LocalConfig = {
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
  ar: {
    get translations() {
      return require('./locales/ar.json');
    },
    name: 'Arabic', // another flag
    flag: flags.arabic,
    isRTL: true,
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
  bg: {
    get translations() {
      return require('./locales/bg.json');
    },
    name: 'Bulgarian',
    flag: flags.bg,
    isRTL: false,
  },
  cs: {
    get translations() {
      return require('./locales/cs.json');
    },
    name: 'Czech',
    flag: flags.cz,
    isRTL: false,
  },
  el: {
    get translations() {
      return require('./locales/el.json');
    },
    name: 'Greek',
    flag: flags.gr,
    isRTL: false,
  },
  es: {
    get translations() {
      return require('./locales/es.json');
    },
    name: 'Spanish',
    flag: flags.es,
    isRTL: false,
  },
  fr: {
    get translations() {
      return require('./locales/fr.json');
    },
    name: 'French',
    flag: flags.fr,
    isRTL: false,
  },
  hu: {
    get translations() {
      return require('./locales/hu.json');
    },
    name: 'Hungarian',
    flag: flags.hu,
    isRTL: false,
  },
  ja: {
    get translations() {
      return require('./locales/ja.json');
    },
    name: 'Japanese',
    flag: flags.jp,
    isRTL: false,
  },
  ko: {
    get translations() {
      return require('./locales/ko.json');
    },
    name: 'Korean',
    flag: flags.kr,
    isRTL: false,
  },
  ms: {
    get translations() {
      return require('./locales/ms.json');
    },
    name: 'Malay',
    flag: flags.id,
    isRTL: false,
  },
  nb: {
    get translations() {
      return require('./locales/nb.json');
    },
    name: 'Norwegian',
    flag: flags.no,
    isRTL: false,
  },
  nn: {
    get translations() {
      return require('./locales/nn.json');
    },
    name: 'Norwegian Nynorsk',
    flag: flags.no,
    isRTL: false,
  },
  pt: {
    get translations() {
      return require('./locales/pt.json');
    },
    name: 'Portuguese',
    flag: flags.pt,
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
  te: {
    get translations() {
      return require('./locales/te.json');
    },
    name: 'Telugu',
    flag: flags.in,
    isRTL: false,
  },
  uk: {
    get translations() {
      return require('./locales/uk.json');
    },
    name: 'Ukrainian',
    flag: flags.ua,
    isRTL: false,
  },
} as const;
