// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';

export const buildDateRangeText = (startDate: string, endDate: string) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (start.month() !== end.month()) {
    return `${start.format('MMM, ddd, DD')} - ${end.format('MMM, ddd, DD')}`;
  } else if (start.date() !== end.date()) {
    return `${start.format('MMMM, ddd, DD')} - ${end.format('ddd, DD')}`;
  } else {
    return start.format('MMMM, ddd, DD');
  }
};
