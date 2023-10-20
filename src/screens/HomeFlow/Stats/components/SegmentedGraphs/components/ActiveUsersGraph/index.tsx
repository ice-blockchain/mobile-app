// SPDX-License-Identifier: ice License 1.0

import {useGetBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetBarGraphDataForStatsPeriod';
import {SectionHeader} from '@components/SectionHeader';
import {commonStyles} from '@constants/styles';
import {AnimatedGraph} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/AnimatedGraph';
import {StatsPeriodSelector} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/StatsPeriodSelector';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React, {memo, useState} from 'react';
import {View} from 'react-native';

export const DEFAULT_PERIOD = 14;

export const ActiveUsersGraph = memo(() => {
  const [period, setPeriod] = useState<StatsPeriod>(DEFAULT_PERIOD);
  const {activeUsersData} = useGetBarGraphDataForStatsPeriod(period);

  return (
    <>
      <SectionHeader
        title={t('stats.user_growth')}
        action={
          <StatsPeriodSelector selectedPeriod={period} onChange={setPeriod} />
        }
      />
      <View style={commonStyles.flexOne}>
        <AnimatedGraph data={activeUsersData} />
      </View>
    </>
  );
});
