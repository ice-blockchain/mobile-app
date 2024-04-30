// SPDX-License-Identifier: ice License 1.0

import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {commonStyles} from '@constants/styles';
import {ActiveUsersGraph} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/ActiveUsersGraph';
import {TotalCoinsGraph} from '@screens/HomeFlow/Stats/components/SegmentedGraphs/components/TotalCoinsGraph';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

export const SEGMENTS = [
  {text: t('stats.active'), key: 'active_users'},
  {text: t('stats.total_coins'), key: 'total_coins'},
] as const;

export const SegmentedGraphs = memo(() => {
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const onSegmentChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    const index = event.nativeEvent.position;
    switcherRef.current?.changeSegment(index);
  };

  return (
    <View style={commonStyles.flexOne}>
      <SegmentedControl
        segments={SEGMENTS}
        ref={switcherRef}
        onChange={onSegmentChange}
        style={styles.segmentSwitcher}
      />
      <PagerView
        initialPage={0}
        style={commonStyles.flexOne}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        <ActiveUsersGraph />
        <TotalCoinsGraph />
      </PagerView>
    </View>
  );
});

const styles = StyleSheet.create({
  segmentSwitcher: {
    marginTop: rem(20),
    marginHorizontal: rem(20),
  },
});
