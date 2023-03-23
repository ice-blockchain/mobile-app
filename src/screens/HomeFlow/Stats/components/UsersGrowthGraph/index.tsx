// SPDX-License-Identifier: ice License 1.0

import {BarGraph, getBarGraphHeight} from '@components/BarGraph';
import {useGetBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetBarGraphDataForStatsPeriod';
import {SectionHeader} from '@components/SectionHeader';
import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {HomeTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

type GraphCategory = 'total' | 'active';

export const SEGMENTS: ReadonlyArray<{text: string; key: GraphCategory}> = [
  {text: t('stats.total'), key: 'total'},
  {text: t('stats.active'), key: 'active'},
];

const DEFAULT_USER_GROWTH_STATS_PERIOD = 3;

export const UsersGrowthGraph = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);
  const segmentRef = useRef(SEGMENTS[0]);

  const onSegmentChange = useCallback((index: number) => {
    segmentRef.current = SEGMENTS[index];
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    const index = event.nativeEvent.position;
    segmentRef.current = SEGMENTS[index];
    switcherRef.current?.changeSegment(index);
  };

  const onSeeAll = () => {
    navigation.navigate('UserGrowthGraph', {
      category: segmentRef.current.key,
      statsPeriod: DEFAULT_USER_GROWTH_STATS_PERIOD,
    });
  };

  const {activeUsersData, totalUsersData} = useGetBarGraphDataForStatsPeriod(
    DEFAULT_USER_GROWTH_STATS_PERIOD,
  );

  return (
    <View>
      <SegmentedControl
        segments={SEGMENTS}
        ref={switcherRef}
        onChange={onSegmentChange}
        style={styles.segmentSwitcher}
      />
      <SectionHeader
        title={t('stats.user_growth')}
        action={t('button.see_all')}
        onActionPress={onSeeAll}
      />
      <PagerView
        initialPage={0}
        style={[
          styles.segmentPager,
          {height: getBarGraphHeight(DEFAULT_USER_GROWTH_STATS_PERIOD)},
        ]}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        <View style={styles.segmentSlide}>
          <BarGraph data={totalUsersData} />
        </View>
        <View style={styles.segmentSlide}>
          <BarGraph data={activeUsersData} />
        </View>
      </PagerView>
    </View>
  );
});

const styles = StyleSheet.create({
  segmentSwitcher: {
    marginTop: rem(20),
    marginHorizontal: rem(20),
  },
  sectionHeaderChevron: {
    transform: [{rotate: '180deg'}],
    marginLeft: rem(6),
    marginBottom: rem(8),
  },
  segmentPager: {
    marginTop: rem(12),
  },
  segmentSlide: {
    paddingHorizontal: rem(20),
  },
});
