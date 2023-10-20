// SPDX-License-Identifier: ice License 1.0

import {BarGraph} from '@components/BarGraph';
import {useGetBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetBarGraphDataForStatsPeriod';
import {DropDownMenu} from '@components/Menu/DropDownMenu';
import {SectionHeader} from '@components/SectionHeader';
import {commonStyles} from '@constants/styles';
import {STATS_PERIODS} from '@store/modules/Stats/constants';
import {t} from '@translations/i18n';
import React, {memo, useState} from 'react';
import {View} from 'react-native';

const PERIODS = STATS_PERIODS.map(period => ({
  label: t(`periods.${period}_days`),
  period,
}));

export const DEFAULT_USER_GROWTH_STATS_PERIOD = 30;

export const ActiveUsersGraph = memo(() => {
  const [periodIndex, setPeriodIndex] = useState(
    STATS_PERIODS.indexOf(DEFAULT_USER_GROWTH_STATS_PERIOD),
  );
  const {activeUsersData} = useGetBarGraphDataForStatsPeriod(
    DEFAULT_USER_GROWTH_STATS_PERIOD,
  );

  return (
    <>
      <SectionHeader
        title={t('stats.user_growth')}
        action={
          <DropDownMenu
            selectedIndex={periodIndex}
            options={PERIODS}
            onChange={setPeriodIndex}
          />
        }
      />
      <View style={commonStyles.flexOne}>
        <BarGraph data={activeUsersData} />
      </View>
    </>
  );
});
