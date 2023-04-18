// SPDX-License-Identifier: ice License 1.0

import {flags} from '@flags';
import {Translations} from '@translations/locales/en.json';

export type SupportedLocale =
  | 'en'
  | 'ro'
  | 'de'
  | 'el'
  | 'af'
  | 'am'
  | 'ar'
  | 'az'
  | 'bg'
  | 'bn'
  | 'yo'
  | 'cs'
  | 'es'
  | 'fa'
  | 'tl-ph'
  | 'fr'
  | 'gu'
  | 'he'
  | 'hi'
  | 'hu'
  | 'id'
  | 'it'
  | 'uk'
  | 'ur'
  | 'vi'
  | 'zh'
  | 'zu'
  | 'ja'
  | 'jv'
  | 'ko'
  | 'mr'
  | 'ms'
  | 'nb'
  | 'nn'
  | 'pa-in'
  | 'pl'
  | 'ps'
  | 'pt'
  | 'ru'
  | 'sd'
  | 'sk'
  | 'sl'
  | 'sq'
  | 'sw'
  | 'ta'
  | 'te'
  | 'th'
  | 'su'
  | 'kn'
  | 'tr'
  | 'zh-cn';

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
  el: {
    get translations() {
      return require('./locales/el.json');
    },
    name: 'Greek',
    flag: flags.gr,
    isRTL: false,
  },
  af: {
    get translations() {
      return require('./locales/af.json');
    },
    name: 'Afrikaans',
    flag: flags.za,
    isRTL: false,
  },
  am: {
    get translations() {
      return require('./locales/am.json');
    },
    name: 'Amharic',
    flag: flags.et,
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
  bg: {
    get translations() {
      return require('./locales/bg.json');
    },
    name: 'Bulgarian',
    flag: flags.bg,
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
  yo: {
    get translations() {
      return require('./locales/yo.json');
    },
    name: 'Yoruba',
    flag: flags.ng,
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
  de: {
    get translations() {
      return require('./locales/de.json');
    },
    name: 'German',
    flag: flags.de,
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
  fa: {
    get translations() {
      return require('./locales/fa.json');
    },
    name: 'Persian',
    flag: flags.ir,
    isRTL: true,
  },
  'tl-ph': {
    get translations() {
      return require('./locales/tl-ph.json');
    },
    name: 'Filipino',
    flag: flags.ph,
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
  gu: {
    get translations() {
      return require('./locales/gu.json');
    },
    name: 'Gujarati',
    flag: flags.in,
    isRTL: false,
  },
  he: {
    get translations() {
      return require('./locales/he.json');
    },
    name: 'Hebrew',
    flag: flags.il,
    isRTL: true,
  },
  hi: {
    get translations() {
      return require('./locales/hi.json');
    },
    name: 'Hindi',
    flag: flags.in,
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
  ja: {
    get translations() {
      return require('./locales/ja.json');
    },
    name: 'Japanese',
    flag: flags.jp,
    isRTL: false,
  },
  jv: {
    get translations() {
      return require('./locales/jv.json');
    },
    name: 'Javanese',
    flag: flags.id,
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
  mr: {
    get translations() {
      return require('./locales/mr.json');
    },
    name: 'Marathi',
    flag: flags.in,
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
  'pa-in': {
    get translations() {
      return require('./locales/pa-in.json');
    },
    name: 'Punjabi',
    flag: flags.pk,
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
  ps: {
    get translations() {
      return require('./locales/ps.json');
    },
    name: 'Pashto',
    flag: flags.af,
    isRTL: true,
  },
  pt: {
    get translations() {
      return require('./locales/pt.json');
    },
    name: 'Portuguese',
    flag: flags.pt,
    isRTL: false,
  },
  ru: {
    get translations() {
      return require('./locales/ru.json');
    },
    name: 'Russian',
    flag: flags.ru,
    isRTL: false,
  },
  sd: {
    get translations() {
      return require('./locales/sd.json');
    },
    name: 'Sindhi',
    flag: flags.pk,
    isRTL: false,
  },
  sk: {
    get translations() {
      return require('./locales/sk.json');
    },
    name: 'Slovak',
    flag: flags.sk,
    isRTL: false,
  },
  sl: {
    get translations() {
      return require('./locales/sl.json');
    },
    name: 'Slovenian',
    flag: flags.si,
    isRTL: false,
  },
  sq: {
    get translations() {
      return require('./locales/sq.json');
    },
    name: 'Albanian',
    flag: flags.al,
    isRTL: false,
  },
  sw: {
    get translations() {
      return require('./locales/sw.json');
    },
    name: 'Swedish',
    flag: flags.se,
    isRTL: false,
  },
  ta: {
    get translations() {
      return require('./locales/ta.json');
    },
    name: 'Tamil',
    flag: flags.in,
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
  th: {
    get translations() {
      return require('./locales/th.json');
    },
    name: 'Thai',
    flag: flags.th,
    isRTL: false,
  },
  su: {
    get translations() {
      return require('./locales/su.json');
    },
    name: 'Sundanese',
    flag: flags.id,
    isRTL: false,
  },
  kn: {
    get translations() {
      return require('./locales/kn.json');
    },
    name: 'Kannada',
    flag: flags.in,
    isRTL: false,
  },
  tr: {
    get translations() {
      return require('./locales/tr.json');
    },
    name: 'Turkish',
    flag: flags.tr,
    isRTL: false,
  },
  'zh-cn': {
    get translations() {
      return require('./locales/zh-cn.json');
    },
    name: 'Traditional Chinese',
    flag: flags.cn,
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
  ur: {
    get translations() {
      return require('./locales/ur.json');
    },
    name: 'Urdu',
    flag: flags.pk,
    isRTL: true,
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
  zu: {
    get translations() {
      return require('./locales/zu.json');
    },
    name: 'Zulu',
    flag: flags.za,
    isRTL: false,
  },
} as const;
