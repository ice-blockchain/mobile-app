// SPDX-License-Identifier: ice License 1.0

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
  fr: {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui",
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
      'martie',
      'aprilie',
      'mai',
      'iunie',
      'iul.',
      'august',
      'sapte.',
      'oct.',
      'nov.',
      'dec.',
    ],
    dayNames: [
      'duminică',
      'luni',
      'marţi',
      'miercuri',
      'joi',
      'vineri',
      'sâmbătă',
    ],
    dayNamesShort: ['dum.', 'lun.', 'mar.', 'mie.', 'joi.', 'vin.', 'sâm.'],
    today: 'astăzi',
  },
  ar: {
    monthNames: [
      'يناير',
      'شهر فبراير',
      'يمشي',
      'أبريل',
      'يمكن',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'اكتوبر',
      'شهر نوفمبر',
      'ديسمبر',
    ],
    monthNamesShort: [
      'يناير.',
      'فبراير.',
      'يمشي.',
      'أبريل.',
      'يمكن.',
      'يونيو.',
      'يوليو.',
      'أغسطس.',
      'سبعة.',
      'أكتوبر',
      'نوفمبر.',
      'ديسمبر.',
    ],
    dayNames: [
      'الأحد',
      'شهور',
      'يوم الثلاثاء',
      'الأربعاء',
      'يوم الخميس',
      'جمعة',
      'السبت',
    ],
    dayNamesShort: [
      'دوم',
      'mon',
      'تفاحة.',
      'ألف.',
      'يوم الخميس.',
      'خمر.',
      'سام.',
    ],
    today: 'اليوم',
  },
};
