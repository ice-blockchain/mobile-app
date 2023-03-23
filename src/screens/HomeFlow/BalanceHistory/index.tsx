// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {CardBody} from '@screens/HomeFlow/BalanceHistory/components/CardBody';
import {DynamicHeight} from '@screens/HomeFlow/BalanceHistory/components/DynamicHeight';
import {useScrollEventsHandlersCustom} from '@screens/HomeFlow/BalanceHistory/components/DynamicHeight/hooks/useScrollEventsHandlersCustom';
import {
  FAST_FILTERS,
  Filter,
  Filters,
} from '@screens/HomeFlow/BalanceHistory/components/Filters';
import {HistoryList} from '@screens/HomeFlow/BalanceHistory/components/HistoryList';
import {PagerHeader} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export const BalanceHistory = () => {
  useFocusStatusBar({style: 'light-content'});
  const [selectedFilter, setSelectedFilter] = useState<Filter>(
    FAST_FILTERS.DAY,
  );

  const {useDefaultHook, scrollY} = useScrollEventsHandlersCustom();

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('balance_history.title')}
        backgroundColor={'transparent'}
      />
      <CardBody>
        <PagerHeader />
      </CardBody>
      <DynamicHeight>
        <HistoryList
          selectedFilter={selectedFilter}
          scrollEventsHandlersHook={useDefaultHook}
        />
        <Filters
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          translateY={scrollY}
        />
      </DynamicHeight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
});
