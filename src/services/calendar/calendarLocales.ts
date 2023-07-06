// SPDX-License-Identifier: ice License 1.0

/**
 * when new locales will be added - uncomment or add locales for the calendar
 */

import {SupportedLocale} from '@translations/localeConfig';

type CalendarLocales = {
  [key in SupportedLocale]?: {
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
    today: string;
  };
};

export const calendarLocales: CalendarLocales = {
  en: {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'June',
      'July',
      'Aug.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    today: 'Today',
  },
  de: {
    monthNames: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'März',
      'Apr.',
      'Mai',
      'Juni',
      'Juli',
      'Aug.',
      'Sep.',
      'Okt.',
      'Nov.',
      'Dez.',
    ],
    dayNames: [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ],
    dayNamesShort: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    today: 'Heute',
  },
  ar: {
    monthNames: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    monthNamesShort: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    dayNames: [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
    dayNamesShort: [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
    today: 'اليوم',
  },
  bn: {
    monthNames: [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ],
    monthNamesShort: [
      'জানু',
      'ফেব',
      'মার্চ',
      'এপ্রি',
      'মে',
      'জুন',
      'জুলা',
      'আগ',
      'সেপ্ট',
      'অক্টো',
      'নভে',
      'ডিসে',
    ],
    dayNames: [
      'রবিবার',
      'সোমবার',
      'মঙ্গলবার',
      'বুধবার',
      'বৃহস্পতিবার',
      'শুক্রবার',
      'শনিবার',
    ],
    dayNamesShort: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
    today: 'আজ',
  },
  hi: {
    monthNames: [
      'जनवरी',
      'फ़रवरी',
      'मार्च',
      'अप्रैल',
      'मई',
      'जून',
      'जुलाई',
      'अगस्त',
      'सितंबर',
      'अक्टूबर',
      'नवंबर',
      'दिसंबर',
    ],
    monthNamesShort: [
      'जन',
      'फ़र',
      'मार्च',
      'अप्रै',
      'मई',
      'जून',
      'जुल',
      'अग',
      'सित',
      'अक्टू',
      'नवं',
      'दिसं',
    ],
    dayNames: [
      'रविवार',
      'सोमवार',
      'मंगलवार',
      'बुधवार',
      'गुरुवार',
      'शुक्रवार',
      'शनिवार',
    ],
    dayNamesShort: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    today: 'आज',
  },
  id: {
    monthNames: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Ags',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ],
    dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    today: 'Hari ini',
  },
  vi: {
    monthNames: [
      'tháng 1',
      'tháng 2',
      'tháng 3',
      'tháng 4',
      'tháng 5',
      'tháng 6',
      'tháng 7',
      'tháng 8',
      'tháng 9',
      'tháng 10',
      'tháng 11',
      'tháng 12',
    ],
    monthNamesShort: [
      'thg 1',
      'thg 2',
      'thg 3',
      'thg 4',
      'thg 5',
      'thg 6',
      'thg 7',
      'thg 8',
      'thg 9',
      'thg 10',
      'thg 11',
      'thg 12',
    ],
    dayNames: [
      'Chủ nhật',
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
  },
  zh: {
    monthNames: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    monthNamesShort: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    dayNames: [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    today: '今天',
  },
  ro: {
    monthNames: [
      'ianuarie',
      'februarie',
      'martie',
      'aprilie',
      'mai',
      'iunie',
      'iulie',
      'august',
      'septembrie',
      'octombrie',
      'noiembrie',
      'decembrie',
    ],
    monthNamesShort: [
      'ian.',
      'feb.',
      'mar.',
      'apr.',
      'mai',
      'iun.',
      'iul.',
      'aug.',
      'sept.',
      'oct.',
      'nov.',
      'dec.',
    ],
    dayNames: [
      'duminică',
      'luni',
      'marți',
      'miercuri',
      'joi',
      'vineri',
      'sâmbătă',
    ],
    dayNamesShort: ['Dum.', 'Lun.', 'Mar.', 'Mie.', 'Joi', 'Vin.', 'Sâm.'],
    today: 'Astăzi',
  },
  el: {
    monthNames: [
      'Ιανουάριος',
      'Φεβρουάριος',
      'Μάρτιος',
      'Απρίλιος',
      'Μάιος',
      'Ιούνιος',
      'Ιούλιος',
      'Αύγουστος',
      'Σεπτέμβριος',
      'Οκτώβριος',
      'Νοέμβριος',
      'Δεκέμβριος',
    ],
    monthNamesShort: [
      'Ιαν.',
      'Φεβ.',
      'Μαρ.',
      'Απρ.',
      'Μαι',
      'Ιουν.',
      'Ιουλ.',
      'Αυγ.',
      'Σεπ.',
      'Οκτ.',
      'Νοε.',
      'Δεκ.',
    ],
    dayNames: [
      'Κυριακή',
      'Δευτέρα',
      'Τρίτη',
      'Τετάρτη',
      'Πέμπτη',
      'Παρασκευή',
      'Σάββατο',
    ],
    dayNamesShort: ['Κυρ.', 'Δευ.', 'Τρί.', 'Τετ.', 'Πέμ.', 'Παρ.', 'Σάβ.'],
    today: 'Σήμερα',
  },
  // af: {
  //   monthNames: [
  //     'Januarie',
  //     'Februarie',
  //     'Maart',
  //     'April',
  //     'Mei',
  //     'Junie',
  //     'Julie',
  //     'Augustus',
  //     'September',
  //     'Oktober',
  //     'November',
  //     'Desember',
  //   ],
  //   monthNamesShort: [
  //     'Jan.',
  //     'Feb.',
  //     'Mrt.',
  //     'Apr.',
  //     'Mei',
  //     'Jun.',
  //     'Jul.',
  //     'Aug.',
  //     'Sep.',
  //     'Okt.',
  //     'Nov.',
  //     'Des.',
  //   ],
  //   dayNames: [
  //     'Sondag',
  //     'Maandag',
  //     'Dinsdag',
  //     'Woensdag',
  //     'Donderdag',
  //     'Vrydag',
  //     'Saterdag',
  //   ],
  //   dayNamesShort: ['Son.', 'Maa.', 'Din.', 'Woe.', 'Don.', 'Vry.', 'Sat.'],
  //   today: 'Vandag',
  // },
  // am: {
  //   monthNames: [
  //     'ጃንዋሪ',
  //     'ፌብሩወሪ',
  //     'ማርች',
  //     'ኤፕረል',
  //     'ሜይ',
  //     'ጁን',
  //     'ጁላይ',
  //     'ኦገስት',
  //     'ሴፕቴምበር',
  //     'ኦክቶበር',
  //     'ኖቬምበር',
  //     'ዲሴምበር',
  //   ],
  //   monthNamesShort: [
  //     'ጃንዋ',
  //     'ፌብሩ',
  //     'ማርች',
  //     'ኤፕረ',
  //     'ሜይ',
  //     'ጁን',
  //     'ጁላይ',
  //     'ኦገስ',
  //     'ሴፕቴ',
  //     'ኦክቶ',
  //     'ኖቬም',
  //     'ዲሴም',
  //   ],
  //   dayNames: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'],
  //   dayNamesShort: ['እሑድ', 'ሰኞ', 'ማክሰ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'],
  //   today: 'ዛሬ',
  // },

  // az: {
  //   monthNames: [
  //     'Yanvar',
  //     'Fevral',
  //     'Mart',
  //     'Aprel',
  //     'May',
  //     'İyun',
  //     'İyul',
  //     'Avqust',
  //     'Sentyabr',
  //     'Oktyabr',
  //     'Noyabr',
  //     'Dekabr',
  //   ],
  //   monthNamesShort: [
  //     'Yan',
  //     'Fev',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'İyun',
  //     'İyul',
  //     'Avq',
  //     'Sen',
  //     'Okt',
  //     'Noy',
  //     'Dek',
  //   ],
  //   dayNames: [
  //     'Bazar',
  //     'Bazar ertəsi',
  //     'Çərşənbə axşamı',
  //     'Çərşənbə',
  //     'Cümə axşamı',
  //     'Cümə',
  //     'Şənbə',
  //   ],
  //   dayNamesShort: ['B.', 'B.E.', 'Ç.A.', 'Ç.', 'C.A.', 'C.', 'Ş.'],
  //   today: 'Bu gün',
  // },
  bg: {
    monthNames: [
      'януари',
      'февруари',
      'март',
      'април',
      'май',
      'юни',
      'юли',
      'август',
      'септември',
      'октомври',
      'ноември',
      'декември',
    ],
    monthNamesShort: [
      'яну',
      'фев',
      'мар',
      'апр',
      'май',
      'юни',
      'юли',
      'авг',
      'сеп',
      'окт',
      'ное',
      'дек',
    ],
    dayNames: [
      'неделя',
      'понеделник',
      'вторник',
      'сряда',
      'четвъртък',
      'петък',
      'събота',
    ],
    dayNamesShort: ['нед.', 'пон.', 'вт.', 'ср.', 'чет.', 'пет.', 'съб.'],
    today: 'Днес',
  },

  // yo: {
  //   monthNames: [
  //     'Oṣù Ṣẹ́rẹ́',
  //     'Oṣù Èrèlè',
  //     'Oṣù Ẹrẹ̀nà',
  //     'Oṣù Ìgbé',
  //     'Oṣù Ẹ̀bibi',
  //     'Oṣù Òkúdu',
  //     'Oṣù Agẹmọ',
  //     'Oṣù Ògún',
  //     'Oṣù Owewe',
  //     'Oṣù Ọ̀wàrà',
  //     'Oṣù Bélú',
  //     'Oṣù Ọ̀pẹ̀',
  //   ],
  //   monthNamesShort: [
  //     'Ṣẹ́rẹ́',
  //     'Èrèlè',
  //     'Ẹrẹ̀nà',
  //     'Ìgbé',
  //     'Ẹ̀bibi',
  //     'Òkúdu',
  //     'Agẹmọ',
  //     'Ògún',
  //     'Owewe',
  //     'Ọ̀wàrà',
  //     'Bélú',
  //     'Ọ̀pẹ̀',
  //   ],
  //   dayNames: [
  //     'Ọjọ́ Àìkú',
  //     'Ọjọ́ Ajé',
  //     'Ọjọ́ Ìsẹ́gun',
  //     'Ọjọ́rú',
  //     'Ọjọ́bọ',
  //     'Ọjọ́ Ẹtì',
  //     'Ọjọ́ Àbámẹ́ta',
  //   ],
  //   dayNamesShort: [
  //     'Àìkú',
  //     'Ajé',
  //     'Ìsẹ́gun',
  //     'Ọjọ́rú',
  //     'Ọjọ́bọ',
  //     'Ẹtì',
  //     'Àbámẹ́ta',
  //   ],
  //   today: 'Láàrúnyẹ',
  // },
  cs: {
    monthNames: [
      'leden',
      'únor',
      'březen',
      'duben',
      'květen',
      'červen',
      'červenec',
      'srpen',
      'září',
      'říjen',
      'listopad',
      'prosinec',
    ],
    monthNamesShort: [
      'led',
      'úno',
      'bře',
      'dub',
      'kvě',
      'čer',
      'čvc',
      'srp',
      'zář',
      'říj',
      'lis',
      'pro',
    ],
    dayNames: [
      'neděle',
      'pondělí',
      'úterý',
      'středa',
      'čtvrtek',
      'pátek',
      'sobota',
    ],
    dayNamesShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
    today: 'Dnes',
  },

  es: {
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthNamesShort: [
      'ene.',
      'feb.',
      'mar.',
      'abr.',
      'may.',
      'jun.',
      'jul.',
      'ago.',
      'sep.',
      'oct.',
      'nov.',
      'dic.',
    ],
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ],
    dayNamesShort: ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    today: 'Hoy',
  },
  // fa: {
  //   monthNames: [
  //     'ژانویه',
  //     'فوریه',
  //     'مارس',
  //     'آوریل',
  //     'مه',
  //     'ژوئن',
  //     'ژوئیه',
  //     'اوت',
  //     'سپتامبر',
  //     'اکتبر',
  //     'نوامبر',
  //     'دسامبر',
  //   ],
  //   monthNamesShort: [
  //     'ژانویه',
  //     'فوریه',
  //     'مارس',
  //     'آوریل',
  //     'مه',
  //     'ژوئن',
  //     'ژوئیه',
  //     'اوت',
  //     'سپتامبر',
  //     'اکتبر',
  //     'نوامبر',
  //     'دسامبر',
  //   ],
  //   dayNames: [
  //     'یک‌شنبه',
  //     'دوشنبه',
  //     'سه‌شنبه',
  //     'چهارشنبه',
  //     'پنج‌شنبه',
  //     'جمعه',
  //     'شنبه',
  //   ],
  //   dayNamesShort: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  //   today: 'امروز',
  // },
  // tl: {
  //   monthNames: [
  //     'Enero',
  //     'Pebrero',
  //     'Marso',
  //     'Abril',
  //     'Mayo',
  //     'Hunyo',
  //     'Hulyo',
  //     'Agosto',
  //     'Setyembre',
  //     'Oktubre',
  //     'Nobyembre',
  //     'Disyembre',
  //   ],
  //   monthNamesShort: [
  //     'Ene',
  //     'Peb',
  //     'Mar',
  //     'Abr',
  //     'May',
  //     'Hun',
  //     'Hul',
  //     'Ago',
  //     'Set',
  //     'Okt',
  //     'Nob',
  //     'Dis',
  //   ],
  //   dayNames: [
  //     'Linggo',
  //     'Lunes',
  //     'Martes',
  //     'Miyerkules',
  //     'Huwebes',
  //     'Biyernes',
  //     'Sabado',
  //   ],
  //   dayNamesShort: ['Lin', 'Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab'],
  //   today: 'Ngayon',
  // },
  fr: {
    monthNames: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
    monthNamesShort: [
      'janv.',
      'févr.',
      'mars',
      'avr.',
      'mai',
      'juin',
      'juil.',
      'août',
      'sept.',
      'oct.',
      'nov.',
      'déc.',
    ],
    dayNames: [
      'dimanche',
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
    ],
    dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    today: "Aujourd'hui",
  },
  // gu: {
  //   monthNames: [
  //     'જાન્યુઆરી',
  //     'ફેબ્રુઆરી',
  //     'માર્ચ',
  //     'એપ્રિલ',
  //     'મે',
  //     'જૂન',
  //     'જુલાઈ',
  //     'ઑગસ્ટ',
  //     'સપ્ટેમ્બર',
  //     'ઑક્ટોબર',
  //     'નવેમ્બર',
  //     'ડિસેમ્બર',
  //   ],
  //   monthNamesShort: [
  //     'જાન્યુ',
  //     'ફેબ્રુ',
  //     'માર્ચ',
  //     'એપ્રિ',
  //     'મે',
  //     'જૂન',
  //     'જુલા',
  //     'ઑગ',
  //     'સપ્ટે',
  //     'ઑક્ટો',
  //     'નવે',
  //     'ડિસે',
  //   ],
  //   dayNames: [
  //     'રવિવાર',
  //     'સોમવાર',
  //     'મંગળવાર',
  //     'બુધવાર',
  //     'ગુરુવાર',
  //     'શુક્રવાર',
  //     'શનિવાર',
  //   ],
  //   dayNamesShort: ['રવિ', 'સોમ', 'મંગ', 'બુધ', 'ગુરુ', 'શુક્ર', 'શનિ'],
  //   today: 'આજે',
  // },
  // he: {
  //   monthNames: [
  //     'ינואר',
  //     'פברואר',
  //     'מרץ',
  //     'אפריל',
  //     'מאי',
  //     'יוני',
  //     'יולי',
  //     'אוגוסט',
  //     'ספטמבר',
  //     'אוקטובר',
  //     'נובמבר',
  //     'דצמבר',
  //   ],
  //   monthNamesShort: [
  //     'ינו',
  //     'פבר',
  //     'מרץ',
  //     'אפר',
  //     'מאי',
  //     'יונ',
  //     'יול',
  //     'אוג',
  //     'ספט',
  //     'אוק',
  //     'נוב',
  //     'דצמ',
  //   ],
  //   dayNames: [
  //     'יום ראשון',
  //     'יום שני',
  //     'יום שלישי',
  //     'יום רביעי',
  //     'יום חמישי',
  //     'יום שישי',
  //     'שבת',
  //   ],
  //   dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
  //   today: 'היום',
  // },

  hu: {
    monthNames: [
      'január',
      'február',
      'március',
      'április',
      'május',
      'június',
      'július',
      'augusztus',
      'szeptember',
      'október',
      'november',
      'december',
    ],
    monthNamesShort: [
      'jan.',
      'febr.',
      'márc.',
      'ápr.',
      'máj.',
      'jún.',
      'júl.',
      'aug.',
      'szept.',
      'okt.',
      'nov.',
      'dec.',
    ],
    dayNames: [
      'vasárnap',
      'hétfő',
      'kedd',
      'szerda',
      'csütörtök',
      'péntek',
      'szombat',
    ],
    dayNamesShort: ['vas', 'hét', 'ked', 'sze', 'csü', 'pén', 'szo'],
    today: 'Ma',
  },

  // it: {
  //   monthNames: [
  //     'gennaio',
  //     'febbraio',
  //     'marzo',
  //     'aprile',
  //     'maggio',
  //     'giugno',
  //     'luglio',
  //     'agosto',
  //     'settembre',
  //     'ottobre',
  //     'novembre',
  //     'dicembre',
  //   ],
  //   monthNamesShort: [
  //     'gen',
  //     'feb',
  //     'mar',
  //     'apr',
  //     'mag',
  //     'giu',
  //     'lug',
  //     'ago',
  //     'set',
  //     'ott',
  //     'nov',
  //     'dic',
  //   ],
  //   dayNames: [
  //     'domenica',
  //     'lunedì',
  //     'martedì',
  //     'mercoledì',
  //     'giovedì',
  //     'venerdì',
  //     'sabato',
  //   ],
  //   dayNamesShort: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  //   today: 'Oggi',
  // },
  ja: {
    monthNames: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    monthNamesShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    dayNames: [
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
    ],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    today: '今日',
  },
  // jv: {
  //   monthNames: [
  //     'Januari',
  //     'Februari',
  //     'Maret',
  //     'April',
  //     'Mei',
  //     'Juni',
  //     'Juli',
  //     'Agustus',
  //     'September',
  //     'Oktober',
  //     'November',
  //     'Desember',
  //   ],
  //   monthNamesShort: [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'Mei',
  //     'Jun',
  //     'Jul',
  //     'Ags',
  //     'Sep',
  //     'Okt',
  //     'Nov',
  //     'Des',
  //   ],
  //   dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  //   dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  //   today: 'Saiki',
  // },
  ko: {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
  },
  // mr: {
  //   monthNames: [
  //     'जानेवारी',
  //     'फेब्रुवारी',
  //     'मार्च',
  //     'एप्रिल',
  //     'मे',
  //     'जून',
  //     'जुलै',
  //     'ऑगस्ट',
  //     'सप्टेंबर',
  //     'ऑक्टोबर',
  //     'नोव्हेंबर',
  //     'डिसेंबर',
  //   ],
  //   monthNamesShort: [
  //     'जाने',
  //     'फेब्रु',
  //     'मार्च',
  //     'एप्रि',
  //     'मे',
  //     'जून',
  //     'जुलै',
  //     'ऑग',
  //     'सप्टे',
  //     'ऑक्टो',
  //     'नोव्हे',
  //     'डिसे',
  //   ],
  //   dayNames: [
  //     'रविवार',
  //     'सोमवार',
  //     'मंगळवार',
  //     'बुधवार',
  //     'गुरुवार',
  //     'शुक्रवार',
  //     'शनिवार',
  //   ],
  //   dayNamesShort: ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  //   today: 'आज',
  // },
  ms: {
    monthNames: [
      'Januari',
      'Februari',
      'Mac',
      'April',
      'Mei',
      'Jun',
      'Julai',
      'Ogos',
      'September',
      'Oktober',
      'November',
      'Disember',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mac',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Ogs',
      'Sep',
      'Okt',
      'Nov',
      'Dis',
    ],
    dayNames: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
    dayNamesShort: ['Aha', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
    today: 'Hari ini',
  },
  nn: {
    monthNames: [
      'januar',
      'februar',
      'mars',
      'april',
      'mai',
      'juni',
      'juli',
      'august',
      'september',
      'oktober',
      'november',
      'desember',
    ],
    monthNamesShort: [
      'jan.',
      'feb.',
      'mars',
      'apr.',
      'mai',
      'juni',
      'juli',
      'aug.',
      'sep.',
      'okt.',
      'nov.',
      'des.',
    ],
    dayNames: [
      'søndag',
      'mandag',
      'tirsdag',
      'onsdag',
      'torsdag',
      'fredag',
      'lørdag',
    ],
    dayNamesShort: ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
    today: 'I dag',
  },
  nb: {
    monthNames: [
      'januar',
      'februar',
      'mars',
      'april',
      'mai',
      'juni',
      'juli',
      'august',
      'september',
      'oktober',
      'november',
      'desember',
    ],
    monthNamesShort: [
      'jan.',
      'feb.',
      'mars',
      'apr.',
      'mai',
      'juni',
      'juli',
      'aug.',
      'sep.',
      'okt.',
      'nov.',
      'des.',
    ],
    dayNames: [
      'søndag',
      'mandag',
      'tirsdag',
      'onsdag',
      'torsdag',
      'fredag',
      'lørdag',
    ],
    dayNamesShort: ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
    today: 'I dag',
  },
  // pa: {
  //   monthNames: [
  //     'ਜਨਵਰੀ',
  //     'ਫ਼ਰਵਰੀ',
  //     'ਮਾਰਚ',
  //     'ਅਪ੍ਰੈਲ',
  //     'ਮਈ',
  //     'ਜੂਨ',
  //     'ਜੁਲਾਈ',
  //     'ਅਗਸਤ',
  //     'ਸਤੰਬਰ',
  //     'ਅਕਤੂਬਰ',
  //     'ਨਵੰਬਰ',
  //     'ਦਸੰਬਰ',
  //   ],
  //   monthNamesShort: [
  //     'ਜਨ',
  //     'ਫ਼ਰ',
  //     'ਮਾਰ',
  //     'ਅਪ੍ਰੈ',
  //     'ਮਈ',
  //     'ਜੂਨ',
  //     'ਜੁਲ',
  //     'ਅਗ',
  //     'ਸਤੰ',
  //     'ਅਕਤੂ',
  //     'ਨਵੰ',
  //     'ਦਸੰ',
  //   ],
  //   dayNames: [
  //     'ਐਤਵਾਰ',
  //     'ਸੋਮਵਾਰ',
  //     'ਮੰਗਲਵਾਰ',
  //     'ਬੁੱਧਵਾਰ',
  //     'ਵੀਰਵਾਰ',
  //     'ਸ਼ੁੱਕਰਵਾਰ',
  //     'ਸ਼ਨੀਵਾਰ',
  //   ],
  //   dayNamesShort: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕ', 'ਸ਼ਨੀ'],
  //   today: 'ਅੱਜ',
  // },
  // pl: {
  //   monthNames: [
  //     'stycznia',
  //     'lutego',
  //     'marca',
  //     'kwietnia',
  //     'maja',
  //     'czerwca',
  //     'lipca',
  //     'sierpnia',
  //     'września',
  //     'października',
  //     'listopada',
  //     'grudnia',
  //   ],
  //   monthNamesShort: [
  //     'sty',
  //     'lut',
  //     'mar',
  //     'kwi',
  //     'maj',
  //     'cze',
  //     'lip',
  //     'sie',
  //     'wrz',
  //     'paź',
  //     'lis',
  //     'gru',
  //   ],
  //   dayNames: [
  //     'niedziela',
  //     'poniedziałek',
  //     'wtorek',
  //     'środa',
  //     'czwartek',
  //     'piątek',
  //     'sobota',
  //   ],
  //   dayNamesShort: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
  //   today: 'Dziś',
  // },
  // ps: {
  //   monthNames: [
  //     'جنوري',
  //     'فبروري',
  //     'مارچ',
  //     'اپریل',
  //     'مۍ',
  //     'جون',
  //     'جولای',
  //     'اګست',
  //     'سپتمبر',
  //     'اکتوبر',
  //     'نومبر',
  //     'دسمبر',
  //   ],
  //   monthNamesShort: [
  //     'جنو',
  //     'فبر',
  //     'مارچ',
  //     'اپر',
  //     'مۍ',
  //     'جون',
  //     'جول',
  //     'اګس',
  //     'سپت',
  //     'اکت',
  //     'نوم',
  //     'دسم',
  //   ],
  //   dayNames: [
  //     'یکشنبه',
  //     'دوشنبه',
  //     'سه‌شنبه',
  //     'چهارشنبه',
  //     'پنځشنبه',
  //     'جمعه',
  //     'شنبه',
  //   ],
  //   dayNamesShort: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  //   today: 'نن',
  // },
  pt: {
    monthNames: [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ],
    monthNamesShort: [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez',
    ],
    dayNames: [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    today: 'Hoje',
  },
  // ru: {
  //   monthNames: [
  //     'январь',
  //     'февраль',
  //     'март',
  //     'апрель',
  //     'май',
  //     'июнь',
  //     'июль',
  //     'август',
  //     'сентябрь',
  //     'октябрь',
  //     'ноябрь',
  //     'декабрь',
  //   ],
  //   monthNamesShort: [
  //     'янв.',
  //     'февр.',
  //     'март',
  //     'апр.',
  //     'май',
  //     'июнь',
  //     'июль',
  //     'авг.',
  //     'сент.',
  //     'окт.',
  //     'нояб.',
  //     'дек.',
  //   ],
  //   dayNames: [
  //     'воскресенье',
  //     'понедельник',
  //     'вторник',
  //     'среда',
  //     'четверг',
  //     'пятница',
  //     'суббота',
  //   ],
  //   dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  //   today: 'Сегодня',
  // },
  // sd: {
  //   monthNames: [
  //     'جنوري',
  //     'فيبروري',
  //     'مارچ',
  //     'اپريل',
  //     'مئي',
  //     'جون',
  //     'جولاءِ',
  //     'آگسٽ',
  //     'سيپٽمبر',
  //     'آڪٽوبر',
  //     'نومبر',
  //     'ڊسمبر',
  //   ],
  //   monthNamesShort: [
  //     'جنوري',
  //     'فيبروري',
  //     'مارچ',
  //     'اپريل',
  //     'مئي',
  //     'جون',
  //     'جولاءِ',
  //     'آگسٽ',
  //     'سيپٽمبر',
  //     'آڪٽوبر',
  //     'نومبر',
  //     'ڊسمبر',
  //   ],
  //   dayNames: ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'],
  //   dayNamesShort: ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'],
  //   today: 'اڄ',
  // },
  // sk: {
  //   monthNames: [
  //     'január',
  //     'február',
  //     'marec',
  //     'apríl',
  //     'máj',
  //     'jún',
  //     'júl',
  //     'august',
  //     'september',
  //     'október',
  //     'november',
  //     'december',
  //   ],
  //   monthNamesShort: [
  //     'jan',
  //     'feb',
  //     'mar',
  //     'apr',
  //     'máj',
  //     'jún',
  //     'júl',
  //     'aug',
  //     'sep',
  //     'okt',
  //     'nov',
  //     'dec',
  //   ],
  //   dayNames: [
  //     'nedeľa',
  //     'pondelok',
  //     'utorok',
  //     'streda',
  //     'štvrtok',
  //     'piatok',
  //     'sobota',
  //   ],
  //   dayNamesShort: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
  //   today: 'Dnes',
  // },
  // sl: {
  //   monthNames: [
  //     'januar',
  //     'februar',
  //     'marec',
  //     'april',
  //     'maj',
  //     'junij',
  //     'julij',
  //     'avgust',
  //     'september',
  //     'oktober',
  //     'november',
  //     'december',
  //   ],
  //   monthNamesShort: [
  //     'jan.',
  //     'feb.',
  //     'mar.',
  //     'apr.',
  //     'maj',
  //     'jun.',
  //     'jul.',
  //     'avg.',
  //     'sep.',
  //     'okt.',
  //     'nov.',
  //     'dec.',
  //   ],
  //   dayNames: [
  //     'nedelja',
  //     'ponedeljek',
  //     'torek',
  //     'sreda',
  //     'četrtek',
  //     'petek',
  //     'sobota',
  //   ],
  //   dayNamesShort: ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
  //   today: 'Danes',
  // },
  // sq: {
  //   monthNames: [
  //     'janar',
  //     'shkurt',
  //     'mars',
  //     'prill',
  //     'maj',
  //     'qershor',
  //     'korrik',
  //     'gusht',
  //     'shtator',
  //     'tetor',
  //     'nëntor',
  //     'dhjetor',
  //   ],
  //   monthNamesShort: [
  //     'jan',
  //     'shk',
  //     'mar',
  //     'pri',
  //     'maj',
  //     'qer',
  //     'kor',
  //     'gus',
  //     'sht',
  //     'tet',
  //     'nën',
  //     'dhj',
  //   ],
  //   dayNames: [
  //     'e diel',
  //     'e hënë',
  //     'e martë',
  //     'e mërkurë',
  //     'e enjte',
  //     'e premte',
  //     'e shtunë',
  //   ],
  //   dayNamesShort: ['di', 'hë', 'ma', 'më', 'en', 'pr', 'sh'],
  //   today: 'Sot',
  // },
  // sv: {
  //   monthNames: [
  //     'januari',
  //     'februari',
  //     'mars',
  //     'april',
  //     'maj',
  //     'juni',
  //     'juli',
  //     'augusti',
  //     'september',
  //     'oktober',
  //     'november',
  //     'december',
  //   ],
  //   monthNamesShort: [
  //     'jan',
  //     'feb',
  //     'mar',
  //     'apr',
  //     'maj',
  //     'jun',
  //     'jul',
  //     'aug',
  //     'sep',
  //     'okt',
  //     'nov',
  //     'dec',
  //   ],
  //   dayNames: [
  //     'söndag',
  //     'måndag',
  //     'tisdag',
  //     'onsdag',
  //     'torsdag',
  //     'fredag',
  //     'lördag',
  //   ],
  //   dayNamesShort: ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'],
  //   today: 'Idag',
  // },
  // ta: {
  //   monthNames: [
  //     'ஜனவரி',
  //     'பிப்ரவரி',
  //     'மார்ச்',
  //     'ஏப்ரல்',
  //     'மே',
  //     'ஜூன்',
  //     'ஜூலை',
  //     'ஆகஸ்டு',
  //     'செப்டம்பர்',
  //     'அக்டோபர்',
  //     'நவம்பர்',
  //     'டிசம்பர்',
  //   ],
  //   monthNamesShort: [
  //     'ஜன',
  //     'பிப்',
  //     'மார்',
  //     'ஏப்',
  //     'மே',
  //     'ஜூன்',
  //     'ஜூலை',
  //     'ஆக',
  //     'செப்',
  //     'அக்',
  //     'நவ',
  //     'டிச',
  //   ],
  //   dayNames: [
  //     'ஞாயிற்றுக்கிழமை',
  //     'திங்கட்கிழமை',
  //     'செவ்வாய்க்கிழமை',
  //     'புதன்கிழமை',
  //     'வியாழக்கிழமை',
  //     'வெள்ளிக்கிழமை',
  //     'சனிக்கிழமை',
  //   ],
  //   dayNamesShort: ['ஞாயி', 'திங்', 'செவ்', 'புத', 'வியா', 'வெள்', 'சனி'],
  //   today: 'இன்று',
  // },
  te: {
    monthNames: [
      'జనవరి',
      'ఫిబ్రవరి',
      'మార్చి',
      'ఏప్రిల్',
      'మే',
      'జూన్',
      'జులై',
      'ఆగస్ట్',
      'సెప్టెంబర్',
      'అక్టోబర్',
      'నవంబర్',
      'డిసెంబర్',
    ],
    monthNamesShort: [
      'జన',
      'ఫిబ్ర',
      'మార్చి',
      'ఏప్రి',
      'మే',
      'జూన్',
      'జులై',
      'ఆగ',
      'సెప్ట',
      'అక్టో',
      'నవం',
      'డిసెం',
    ],
    dayNames: [
      'ఆదివారం',
      'సోమవారం',
      'మంగళవారం',
      'బుధవారం',
      'గురువారం',
      'శుక్రవారం',
      'శనివారం',
    ],
    dayNamesShort: ['ఆది', 'సోమ', 'మంగ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
    today: 'ఈ రోజు',
  },
  // th: {
  //   monthNames: [
  //     'มกราคม',
  //     'กุมภาพันธ์',
  //     'มีนาคม',
  //     'เมษายน',
  //     'พฤษภาคม',
  //     'มิถุนายน',
  //     'กรกฎาคม',
  //     'สิงหาคม',
  //     'กันยายน',
  //     'ตุลาคม',
  //     'พฤศจิกายน',
  //     'ธันวาคม',
  //   ],
  //   monthNamesShort: [
  //     'ม.ค.',
  //     'ก.พ.',
  //     'มี.ค.',
  //     'เม.ย.',
  //     'พ.ค.',
  //     'มิ.ย.',
  //     'ก.ค.',
  //     'ส.ค.',
  //     'ก.ย.',
  //     'ต.ค.',
  //     'พ.ย.',
  //     'ธ.ค.',
  //   ],
  //   dayNames: [
  //     'วันอาทิตย์',
  //     'วันจันทร์',
  //     'วันอังคาร',
  //     'วันพุธ',
  //     'วันพฤหัสบดี',
  //     'วันศุกร์',
  //     'วันเสาร์',
  //   ],
  //   dayNamesShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  //   today: 'วันนี้',
  // },
  // su: {
  //   monthNames: [
  //     'Januari',
  //     'Pébruari',
  //     'Maret',
  //     'April',
  //     'Méi',
  //     'Juni',
  //     'Juli',
  //     'Agustus',
  //     'Séptémber',
  //     'Oktober',
  //     'Nopémber',
  //     'Désémber',
  //   ],
  //   monthNamesShort: [
  //     'Jan',
  //     'Péb',
  //     'Mar',
  //     'Apr',
  //     'Méi',
  //     'Jun',
  //     'Jul',
  //     'Ags',
  //     'Sép',
  //     'Okt',
  //     'Nop',
  //     'Dés',
  //   ],
  //   dayNames: ['Minggu', 'Senén', 'Selasa', 'Rebo', 'Kemis', 'Jumah', 'Sabtu'],
  //   dayNamesShort: ['Min', 'Sen', 'Sel', 'Reb', 'Kem', 'Jum', 'Sab'],
  //   today: 'Ayeuna',
  // },
  // kn: {
  //   monthNames: [
  //     'ಜನವರಿ',
  //     'ಫೆಬ್ರವರಿ',
  //     'ಮಾರ್ಚ್',
  //     'ಎಪ್ರಿಲ್',
  //     'ಮೇ',
  //     'ಜೂನ್',
  //     'ಜುಲೈ',
  //     'ಆಗಸ್ಟ್',
  //     'ಸೆಪ್ಟೆಂಬರ್',
  //     'ಅಕ್ಟೋಬರ್',
  //     'ನವೆಂಬರ್',
  //     'ಡಿಸೆಂಬರ್',
  //   ],
  //   monthNamesShort: [
  //     'ಜನ',
  //     'ಫೆಬ್ರ',
  //     'ಮಾರ್ಚ್',
  //     'ಎಪ್ರ',
  //     'ಮೇ',
  //     'ಜೂನ್',
  //     'ಜುಲೈ',
  //     'ಆಗ',
  //     'ಸೆಪ್ಟ',
  //     'ಅಕ್ಟೋ',
  //     'ನವೆ',
  //     'ಡಿಸೆ',
  //   ],
  //   dayNames: [
  //     'ಭಾನುವಾರ',
  //     'ಸೋಮವಾರ',
  //     'ಮಂಗಳವಾರ',
  //     'ಬುಧವಾರ',
  //     'ಗುರುವಾರ',
  //     'ಶುಕ್ರವಾರ',
  //     'ಶನಿವಾರ',
  //   ],
  //   dayNamesShort: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
  //   today: 'ಇಂದು',
  // },
  // tr: {
  //   monthNames: [
  //     'Ocak',
  //     'Şubat',
  //     'Mart',
  //     'Nisan',
  //     'Mayıs',
  //     'Haziran',
  //     'Temmuz',
  //     'Ağustos',
  //     'Eylül',
  //     'Ekim',
  //     'Kasım',
  //     'Aralık',
  //   ],
  //   monthNamesShort: [
  //     'Oca',
  //     'Şub',
  //     'Mar',
  //     'Nis',
  //     'May',
  //     'Haz',
  //     'Tem',
  //     'Ağu',
  //     'Eyl',
  //     'Eki',
  //     'Kas',
  //     'Ara',
  //   ],
  //   dayNames: [
  //     'Pazar',
  //     'Pazartesi',
  //     'Salı',
  //     'Çarşamba',
  //     'Perşembe',
  //     'Cuma',
  //     'Cumartesi',
  //   ],
  //   dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  //   today: 'Bugün',
  // },
  uk: {
    monthNames: [
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня',
    ],
    monthNamesShort: [
      'січ.',
      'лют.',
      'бер.',
      'квіт.',
      'трав.',
      'черв.',
      'лип.',
      'серп.',
      'вер.',
      'жовт.',
      'лист.',
      'груд.',
    ],
    dayNames: [
      'неділя',
      'понеділок',
      'вівторок',
      'середа',
      'четвер',
      'пʼятниця',
      'субота',
    ],
    dayNamesShort: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    today: 'Сьогодні',
  },
  // ur: {
  //   monthNames: [
  //     'جنوری',
  //     'فروری',
  //     'مارچ',
  //     'اپریل',
  //     'مئی',
  //     'جون',
  //     'جولائی',
  //     'اگست',
  //     'ستمبر',
  //     'اکتوبر',
  //     'نومبر',
  //     'دسمبر',
  //   ],
  //   monthNamesShort: [
  //     'جنوری',
  //     'فروری',
  //     'مارچ',
  //     'اپریل',
  //     'مئی',
  //     'جون',
  //     'جولائی',
  //     'اگسٹ',
  //     'ستمبر',
  //     'اکتوبر',
  //     'نومبر',
  //     'دسمبر',
  //   ],
  //   dayNames: ['اتوار', 'سوموار', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  //   dayNamesShort: ['اتوار', 'سوموار', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  //   today: 'آج',
  // },

  // zu: {
  //   monthNames: [
  //     'Januwari',
  //     'Februwari',
  //     'Mashi',
  //     'Ephreli',
  //     'Meyi',
  //     'Juni',
  //     'Julayi',
  //     'Agasti',
  //     'Septemba',
  //     'Okthoba',
  //     'Novemba',
  //     'Disemba',
  //   ],
  //   monthNamesShort: [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Eph',
  //     'Mey',
  //     'Jun',
  //     'Jul',
  //     'Aga',
  //     'Sep',
  //     'Okt',
  //     'Nov',
  //     'Dis',
  //   ],
  //   dayNames: [
  //     'Sonto',
  //     'Msombuluko',
  //     'Lwesibili',
  //     'Lwesithathu',
  //     'Lwesine',
  //     'Lwesihlanu',
  //     'Mgqibelo',
  //   ],
  //   dayNamesShort: ['Son', 'Mso', 'Bil', 'Tha', 'Sin', 'Hla', 'Mgq'],
  //   today: 'Namhlanje',
  // },
};
