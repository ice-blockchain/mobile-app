// SPDX-License-Identifier: BUSL-1.1

import {StatsGraph} from '@screens/Stats/components/Graph';
import {StatsHeader} from '@screens/Stats/components/Header';
import {TopCountries} from '@screens/Stats/components/TopCountries';
import {TopMiners} from '@screens/Stats/components/TopMiners';
import {StatisticsActions} from '@store/modules/Statistics/actions';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

interface StatsScreenProps {}

export const StatsScreen = ({}: StatsScreenProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StatisticsActions.GET_TOP_COUNTRIES.START.create());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <StatsHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <StatsGraph />

        <TopMiners />
        <TopCountries />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 140,
  },
});
