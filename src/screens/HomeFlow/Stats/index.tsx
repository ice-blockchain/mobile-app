// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {RefreshControl} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Summary} from '@screens/HomeFlow/Stats/components/Summary';
import {
  COUNTRIES_COUNT,
  TopCountries,
} from '@screens/HomeFlow/Stats/components/TopCountries';
import {
  MINERS_COUNT,
  TopMiners,
} from '@screens/HomeFlow/Stats/components/TopMiners';
import {
  DEFAULT_USER_GROWTH_STATS_PERIOD,
  UsersGrowthGraph,
} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph';
import {CollectionActions} from '@store/modules/Collections';
import {StatsActions} from '@store/modules/Stats/actions';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

export const Stats = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const dispatch = useDispatch();

  const tabbarOffset = useBottomTabBarOffsetStyle();

  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(({contentOffset: {y}}) => {
    translateY.value = y;
  });

  const onRefresh = useCallback(() => {
    // Summary && UsersGrowthGraph
    dispatch(
      StatsActions.GET_USER_GROWTH_STATS.START.create(
        DEFAULT_USER_GROWTH_STATS_PERIOD,
      ),
    );

    // TopMiners
    dispatch(
      CollectionActions.GET_TOP_MINERS.START.create({
        offset: 0,
        limit: MINERS_COUNT,
      }),
    );

    // TopCountries
    dispatch(
      CollectionActions.GET_TOP_STATS_COUNTRIES.START.create({
        offset: 0,
        limit: COUNTRIES_COUNT,
      }),
    );
  }, [dispatch]);

  useEffect(onRefresh, [onRefresh]);

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('stats.header_title')}
        backgroundColor={'transparent'}
      />
      <Summary />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffset.current}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl
            theme={'dark-content'}
            // Loading state not implemented
            refreshing={false}
            onRefresh={onRefresh}
            translateY={translateY}
          />
        }>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <UsersGrowthGraph />
          <TopMiners />
          <TopCountries />
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    paddingBottom: 2000,
    marginBottom: -2000,
  },
});
