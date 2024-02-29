// SPDX-License-Identifier: ice License 1.0

import {Translations} from '@translations/locales/en.json';

/**
 * uncomment locales which you add then take look @services/dayjs/index.ts and @services/dayjs/calendarLocales.ts
 */

export type SupportedLocale =
  | 'fa'
  | 'he'
  | 'ur'
  | 'ar'
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
  | 'zh-hant'
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
  | 'uk'
  | 'pa'
  | 'af'
  | 'am'
  | 'kn'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sq'
  | 'sv'
  | 'tr';

export type LocalConfig = {
  [key in SupportedLocale]: {
    readonly translations: Translations;
    name: string;
    isRTL: boolean;
  };
};

export const localeConfig: LocalConfig = {
  fa: {
    get translations() {
      return require('./locales/fa.json');
    },
    name: 'Persian',
    isRTL: true,
  },
  he: {
    get translations() {
      return require('./locales/he.json');
    },
    name: 'Hebrew',
    isRTL: true,
  },
  ur: {
    get translations() {
      return require('./locales/ur.json');
    },
    name: 'Urdu',
    isRTL: true,
  },
  ar: {
    get translations() {
      return require('./locales/ar.json');
    },
    name: 'Arabic',
    isRTL: true,
  },
  en: {
    get translations() {
      return require('./locales/en.json');
    },
    name: 'English',
    isRTL: false,
  },
  az: {
    get translations() {
      return require('./locales/az.json');
    },
    name: 'Azerbaijani',
    isRTL: false,
  },
  bn: {
    get translations() {
      return require('./locales/bn.json');
    },
    name: 'Bengali',
    isRTL: false,
  },
  de: {
    get translations() {
      return require('./locales/de.json');
    },
    name: 'German',
    isRTL: false,
  },
  gu: {
    get translations() {
      return require('./locales/gu.json');
    },
    name: 'Gujarati',
    isRTL: false,
  },
  hi: {
    get translations() {
      return require('./locales/hi.json');
    },
    name: 'Hindi',
    isRTL: false,
  },
  id: {
    get translations() {
      return require('./locales/id.json');
    },
    name: 'Indonesian',
    isRTL: false,
  },
  it: {
    get translations() {
      return require('./locales/it.json');
    },
    name: 'Italian',
    isRTL: false,
  },
  mr: {
    get translations() {
      return require('./locales/mr.json');
    },
    name: 'Marathi',
    isRTL: false,
  },
  pl: {
    get translations() {
      return require('./locales/pl.json');
    },
    name: 'Polish',
    isRTL: false,
  },
  th: {
    get translations() {
      return require('./locales/th.json');
    },
    name: 'Thai',
    isRTL: false,
  },
  vi: {
    get translations() {
      return require('./locales/vi.json');
    },
    name: 'Vietnamese',
    isRTL: false,
  },
  zh: {
    get translations() {
      return require('./locales/zh.json');
    },
    name: 'Simplified Chinese',
    isRTL: false,
  },
  'zh-hant': {
    get translations() {
      return require('./locales/zh-hant.json');
    },
    name: 'Traditional Chinese',
    isRTL: false,
  },
  bg: {
    get translations() {
      return require('./locales/bg.json');
    },
    name: 'Bulgarian',
    isRTL: false,
  },
  cs: {
    get translations() {
      return require('./locales/cs.json');
    },
    name: 'Czech',
    isRTL: false,
  },
  el: {
    get translations() {
      return require('./locales/el.json');
    },
    name: 'Greek',
    isRTL: false,
  },
  es: {
    get translations() {
      return require('./locales/es.json');
    },
    name: 'Spanish',
    isRTL: false,
  },
  fr: {
    get translations() {
      return require('./locales/fr.json');
    },
    name: 'French',
    isRTL: false,
  },
  hu: {
    get translations() {
      return require('./locales/hu.json');
    },
    name: 'Hungarian',
    isRTL: false,
  },
  ja: {
    get translations() {
      return require('./locales/ja.json');
    },
    name: 'Japanese',
    isRTL: false,
  },
  ko: {
    get translations() {
      return require('./locales/ko.json');
    },
    name: 'Korean',
    isRTL: false,
  },
  ms: {
    get translations() {
      return require('./locales/ms.json');
    },
    name: 'Malay',
    isRTL: false,
  },
  nb: {
    get translations() {
      return require('./locales/nb.json');
    },
    name: 'Norwegian',
    isRTL: false,
  },
  nn: {
    get translations() {
      return require('./locales/nn.json');
    },
    name: 'Norwegian Nynorsk',
    isRTL: false,
  },
  pt: {
    get translations() {
      return require('./locales/pt.json');
    },
    name: 'Portuguese',
    isRTL: false,
  },
  ro: {
    get translations() {
      return require('./locales/ro.json');
    },
    name: 'Romanian',
    isRTL: false,
  },
  te: {
    get translations() {
      return require('./locales/te.json');
    },
    name: 'Telugu',
    isRTL: false,
  },
  uk: {
    get translations() {
      return require('./locales/uk.json');
    },
    name: 'Ukrainian',
    isRTL: false,
  },
  pa: {
    get translations() {
      return require('./locales/pa.json');
    },
    name: 'Punjabi',
    isRTL: false,
  },
  af: {
    get translations() {
      return require('./locales/af.json');
    },
    name: 'Afrikaans',
    isRTL: false,
  },
  am: {
    get translations() {
      return require('./locales/am.json');
    },
    name: 'Amharic',
    isRTL: false,
  },
  kn: {
    get translations() {
      return require('./locales/kn.json');
    },
    name: 'Kannada',
    isRTL: false,
  },
  ru: {
    get translations() {
      return require('./locales/ru.json');
    },
    name: 'Russian',
    isRTL: false,
  },
  sk: {
    get translations() {
      return require('./locales/sk.json');
    },
    name: 'Slovak',
    isRTL: false,
  },
  sl: {
    get translations() {
      return require('./locales/sl.json');
    },
    name: 'Slovenian',
    isRTL: false,
  },
  sq: {
    get translations() {
      return require('./locales/sq.json');
    },
    name: 'Albanian',
    isRTL: false,
  },
  sv: {
    get translations() {
      return require('./locales/sv.json');
    },
    name: 'Swedish',
    isRTL: false,
  },
  tr: {
    get translations() {
      return require('./locales/tr.json');
    },
    name: 'Turkish',
    isRTL: false,
  },
  // yo: {
  //   get translations() {
  //     return require('./locales/yo.json');
  //   },
  //   name: 'Yoruba'
  //   isRTL: false,
  // },
  // zu: {
  //   get translations() {
  //     return require('./locales/zu.json');
  //   },
  //   name: 'Zulu'
  //   isRTL: false,
  // },
} as const;
