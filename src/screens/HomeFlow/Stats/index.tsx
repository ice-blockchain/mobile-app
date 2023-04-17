// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {PullToRefreshContainer} from '@components/PullToRefreshContainer';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Summary} from '@screens/HomeFlow/Stats/components/Summary';
import {TopCountries} from '@screens/HomeFlow/Stats/components/TopCountries';
import {TopMiners} from '@screens/HomeFlow/Stats/components/TopMiners';
import {UsersGrowthGraph} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {useOnRefresh} from './hooks/useOnRefresh';

export const Stats = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {refreshing, onRefresh} = useOnRefresh();

  return (
    <View style={styles.container}>
      <LinesBackground />

      <Header
        color={COLORS.white}
        title={t('stats.header_title')}
        backgroundColor={'transparent'}
      />

      <Summary />

      <PullToRefreshContainer
        style={commonStyles.flexOne}
        theme={'dark-content'}
        refreshing={refreshing}
        onRefresh={onRefresh}>
        <Animated.ScrollView
          contentContainerStyle={[
            commonStyles.baseSubScreen,
            tabbarOffset.current,
          ]}
          showsVerticalScrollIndicator={false}>
          <UsersGrowthGraph />

          <TopMiners />

          <TopCountries />
        </Animated.ScrollView>
      </PullToRefreshContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
});
