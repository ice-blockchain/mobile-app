// SPDX-License-Identifier: ice License 1.0

import {BarGraph} from '@components/BarGraph';
import {useGetBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetBarGraphDataForStatsPeriod';
import {SectionHeader} from '@components/SectionHeader';
import {commonStyles} from '@constants/styles';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {View} from 'react-native';

export const DEFAULT_USER_GROWTH_STATS_PERIOD = 14;

export const TotalCoinsGraph = memo(() => {
  const {totalUsersData} = useGetBarGraphDataForStatsPeriod(
    DEFAULT_USER_GROWTH_STATS_PERIOD,
  );

  return (
    <>
      <SectionHeader title={t('stats.total_coins')} />
      <View style={commonStyles.flexOne}>
        <BarGraph data={totalUsersData} />
      </View>
    </>
  );
});
