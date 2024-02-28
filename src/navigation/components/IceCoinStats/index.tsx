// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {IceLogo} from '@navigation/components/IceCoinStats/components/IceLogo';
import {JoinMainnet} from '@navigation/components/IceCoinStats/components/JoinMainnet';
import {Notice} from '@navigation/components/IceCoinStats/components/Notice';
import {Platforms} from '@navigation/components/IceCoinStats/components/Platforms';
import {Roadmap} from '@navigation/components/IceCoinStats/components/Roadmap';
import {Stats} from '@navigation/components/IceCoinStats/components/Stats';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

export const IceCoinStats = () => {
  useFocusStatusBar({style: 'light-content'});
  return (
    <View style={styles.container}>
      <LinesBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={commonStyles.flexOne} edges={['top']}>
          <IceLogo />
          <Notice />
          <Platforms />
          <View style={[commonStyles.baseSubScreen, styles.subScreen]}>
            <Stats />
            <Roadmap />
            <JoinMainnet />
          </View>
          <Text>STATS!</Text>
        </SafeAreaView>
      </ScrollView>
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
  subScreen: {
    marginTop: rem(16),
    paddingBottom: rem(16),
  },
});
