// SPDX-License-Identifier: ice License 1.0

import {TimeSeries} from '@api/statistics/types';
import {BarGraphData} from '@components/BarGraph/types';
import {dayjs} from '@services/dayjs';
import {UsersBarGraphData} from '@store/modules/Stats/types';

export function timeSeriesToUsersData({
  timeSeries,
}: {
  timeSeries: TimeSeries[];
}): UsersBarGraphData {
  if (!timeSeries?.length) {
    return {
      activeUsersData: [],
      totalUsersData: [],
    };
  }

  const activeUsersData: BarGraphData[] = timeSeries.map(({date, active}) => {
    return {
      label: dayjs(date).format('MM/DD'),
      value: active,
    };
  });

  const totalUsersData: BarGraphData[] = timeSeries.map(({date, total}) => {
    return {
      label: dayjs(date).format('MM/DD'),
      value: total,
    };
  });

  return {
    activeUsersData,
    totalUsersData,
  };
}
