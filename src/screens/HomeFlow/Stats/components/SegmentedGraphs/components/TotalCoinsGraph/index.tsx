// SPDX-License-Identifier: ice License 1.0

import {TotalCoinsFilter} from '@api/statistics/types';
import {useGetTotalCoinsBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetTotalCoinsBarGraphDataForStatsPeriod';
import {BarGraphData} from '@components/BarGraph/types';
import {SectionHeader} from '@components/SectionHeader';
import {AnimatedGraph} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/AnimatedGraph';
import {StatsPeriodSelector} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/StatsPeriodSelector';
import {TotalCoinsFilters} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/TotalCoinsGraph/components/TotalCoinsFilters';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React, {memo, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const DEFAULT_PERIOD = 7;
export const DEFAULT_FILTER = 'total';

export const TotalCoinsGraph = memo(() => {
  const [period, setPeriod] = useState<StatsPeriod>(DEFAULT_PERIOD);
  const [filter, setFilter] = useState<TotalCoinsFilter>(DEFAULT_FILTER);
  const {totalData, blockchainData, standardData, preStakingData} =
    useGetTotalCoinsBarGraphDataForStatsPeriod(period);

  const dataForFilter: BarGraphData[] = useMemo(() => {
    switch (filter) {
      case 'total':
        return totalData;
      case 'on-app':
        return standardData;
      case 'on-blockchain':
        return blockchainData;
      case 'pre-staked':
        return preStakingData;
    }
  }, [blockchainData, filter, preStakingData, standardData, totalData]);

  return (
    <AnimatedGraph
      data={dataForFilter}
      ListHeader={
        <View style={styles.listHeader}>
          <SectionHeader
            title={t('stats.total_coins')}
            action={
              <StatsPeriodSelector
                selectedPeriod={period}
                onChange={setPeriod}
              />
            }
          />
          <TotalCoinsFilters selectedFilter={filter} onSelect={setFilter} />
        </View>
      }
      type="total_coins"
    />
  );
});

const styles = StyleSheet.create({
  listHeader: {
    marginBottom: rem(10),
  },
});
