// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {IceLogo} from '@navigation/components/IceCoinStats/components/IceLogo';
import {JoinMainnet} from '@navigation/components/IceCoinStats/components/JoinMainnet';
import {Roadmap} from '@navigation/components/IceCoinStats/components/Roadmap';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const IceCoinStats = () => {
  // const config = useSelector(iceCoinStatsSelector);
  useFocusStatusBar({style: 'light-content'});
  return (
    <View style={styles.container}>
      <LinesBackground />
      <SafeAreaView style={commonStyles.flexOne} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <IceLogo />
          <View style={commonStyles.baseSubScreen}>
            <Roadmap />
            <JoinMainnet />
          </View>
          <Text>STATS!</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
