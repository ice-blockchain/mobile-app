// SPDX-License-Identifier: ice License 1.0

import {TotalCoinsFilter} from '@api/statistics/types';
import {BarGraph} from '@components/BarGraph';
import {useGetBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetBarGraphDataForStatsPeriod';
import {SectionHeader} from '@components/SectionHeader';
import {commonStyles} from '@constants/styles';
import {StatsPeriodSelector} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/StatsPeriodSelector';
import {TotalCoinsFilters} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/TotalCoinsGraph/components/TotalCoinsFilters';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React, {memo, useState} from 'react';
import {View} from 'react-native';

export const DEFAULT_PERIOD = 14;
export const DEFAULT_FILTER = 'total';

export const TotalCoinsGraph = memo(() => {
  const [period, setPeriod] = useState<StatsPeriod>(DEFAULT_PERIOD);
  const [filter, setFilter] = useState<TotalCoinsFilter>(DEFAULT_FILTER);
  const {totalUsersData} = useGetBarGraphDataForStatsPeriod(period);

  return (
    <>
      <SectionHeader
        title={t('stats.coin_economics')}
        action={
          <StatsPeriodSelector selectedPeriod={period} onChange={setPeriod} />
        }
      />
      <TotalCoinsFilters selectedFilter={filter} onSelect={setFilter} />
      <View style={commonStyles.flexOne}>
        <BarGraph data={totalUsersData} />
      </View>
    </>
  );
});
