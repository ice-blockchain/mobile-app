// SPDX-License-Identifier: ice License 1.0

import {TotalCoinsTimeSeries} from '@api/tokenomics/types';
import {BarGraphData} from '@components/BarGraph/types';
import {dayjs} from '@services/dayjs';
import {TotalCoinsBarGraphData} from '@store/modules/Tokenomics/types';

export function totalCoinsToGraphData({
  timeSeries,
}: {
  timeSeries: TotalCoinsTimeSeries[];
}): TotalCoinsBarGraphData {
  if (!timeSeries?.length) {
    return {
      blockchainData: [],
      preStakingData: [],
      standardData: [],
      totalData: [],
    };
  }

  const blockchainData: BarGraphData[] = timeSeries.map(
    ({date, blockchain}) => {
      return {
        label: dayjs(date).format('MM/DD'),
        value: blockchain,
      };
    },
  );

  const preStakingData: BarGraphData[] = timeSeries.map(
    ({date, preStaking}) => {
      return {
        label: dayjs(date).format('MM/DD'),
        value: preStaking,
      };
    },
  );

  const standardData: BarGraphData[] = timeSeries.map(({date, standard}) => {
    return {
      label: dayjs(date).format('MM/DD'),
      value: standard,
    };
  });

  const totalData: BarGraphData[] = timeSeries.map(({date, total}) => {
    return {
      label: dayjs(date).format('MM/DD'),
      value: total,
    };
  });

  return {
    blockchainData,
    preStakingData,
    standardData,
    totalData,
  };
}
