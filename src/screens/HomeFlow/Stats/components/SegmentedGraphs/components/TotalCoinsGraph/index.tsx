// SPDX-License-Identifier: ice License 1.0

import {TotalCoinsFilter} from '@api/statistics/types';
import {useGetBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetBarGraphDataForStatsPeriod';
import {SectionHeader} from '@components/SectionHeader';
import {AnimatedGraph} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/AnimatedGraph';
import {StatsPeriodSelector} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/StatsPeriodSelector';
import {TotalCoinsFilters} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/TotalCoinsGraph/components/TotalCoinsFilters';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React, {memo, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const DEFAULT_PERIOD = 14;
export const DEFAULT_FILTER = 'total';

export const TotalCoinsGraph = memo(() => {
  const [period, setPeriod] = useState<StatsPeriod>(DEFAULT_PERIOD);
  const [filter, setFilter] = useState<TotalCoinsFilter>(DEFAULT_FILTER);
  const {totalUsersData} = useGetBarGraphDataForStatsPeriod(period); //TODO::select data

  const ListHeader = useMemo(() => {
    return (
      <View style={styles.listHeader}>
        <SectionHeader
          title={t('stats.total_coins')}
          action={
            <StatsPeriodSelector selectedPeriod={period} onChange={setPeriod} />
          }
        />
        <TotalCoinsFilters selectedFilter={filter} onSelect={setFilter} />
      </View>
    );
  }, [period, filter]);

  return (
    <AnimatedGraph
      data={totalUsersData}
      ListHeader={ListHeader}
      type="total_coins"
    />
  );
});

const styles = StyleSheet.create({
  listHeader: {
    marginBottom: rem(10),
  },
});
