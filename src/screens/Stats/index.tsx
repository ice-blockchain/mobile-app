// SPDX-License-Identifier: BUSL-1.1

import {StatsGraph} from '@screens/Stats/components/Graph';
import {StatsHeader} from '@screens/Stats/components/Header';
import {TopCountries} from '@screens/Stats/components/TopCountries';
import {TopMiners} from '@screens/Stats/components/TopMiners';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

interface StatsScreenProps {}

export const StatsScreen = ({}: StatsScreenProps) => {
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
