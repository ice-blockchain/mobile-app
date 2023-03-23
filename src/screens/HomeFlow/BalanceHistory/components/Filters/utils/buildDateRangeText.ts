// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';

export const buildDateRangeText = (startDate: string, endDate: string) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (start.year() !== end.year()) {
    return `${start.format('MMM DD, YYYY')} - ${end.format('MMM DD, YYYY')}`;
  } else if (start.month() !== end.month()) {
    return `${start.format('MMM DD')} - ${end.format('MMM DD, YYYY')}`;
  } else if (start.date() !== end.date()) {
    return `${start.format('MMM DD')} - ${end.format('DD, YYYY')}`;
  } else {
    return start.format('MMM DD, YYYY');
  }
};
