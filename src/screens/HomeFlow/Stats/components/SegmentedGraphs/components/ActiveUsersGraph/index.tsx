// SPDX-License-Identifier: ice License 1.0

import {useGetUserGrowthBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetUserGrowthBarGraphDataForStatsPeriod';
import {SectionHeader} from '@components/SectionHeader';
import {commonStyles} from '@constants/styles';
import {AnimatedGraph} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/AnimatedGraph';
import {StatsPeriodSelector} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/StatsPeriodSelector';
import {TopMiners} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/TopMiners';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const DEFAULT_PERIOD = 7;

export const ActiveUsersGraph = memo(() => {
  const [period, setPeriod] = useState<StatsPeriod>(DEFAULT_PERIOD);
  const {activeUsersData} = useGetUserGrowthBarGraphDataForStatsPeriod(period);

  return (
    <View style={commonStyles.flexOne}>
      <AnimatedGraph
        data={activeUsersData}
        ListHeader={
          <SectionHeader
            style={styles.sectionHeader}
            title={t('stats.user_growth')}
            action={
              <StatsPeriodSelector
                selectedPeriod={period}
                onChange={setPeriod}
              />
            }
          />
        }
        ListFooter={<TopMiners />}
        type={'active_users'}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: rem(10),
  },
});
