// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {t} from '@translations/i18n';
import {Duration} from 'dayjs/plugin/duration';

export function getPreviousDate(dayBack: number) {
  const currentDate = dayjs();
  const date = currentDate.set('date', currentDate.get('date') - dayBack);
  return date.format('MM/DD');
}

export const getDurationString = (duration: Duration, numberOfUnits = 2) => {
  const parts = [
    {value: Math.floor(duration.asDays()), unit: t('general.days_short')},
    {value: duration.hours(), unit: t('general.hours_short')},
    {value: duration.minutes(), unit: t('general.minutes_short')},
    {value: duration.seconds(), unit: t('general.seconds_short')},
  ];

  const firstNotZeroIndex = parts.findIndex(({value}) => value > 0);

  return parts
    .slice(firstNotZeroIndex, firstNotZeroIndex + numberOfUnits)
    .filter(({value}) => value > 0)
    .map(({value, unit}) => value + unit)
    .join(' ');
};
