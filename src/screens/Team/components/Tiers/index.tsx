// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {RATIO} from '@constants/styles';
import {Contacts} from '@screens/Team/components/Contacts';
import {Tier, TierType} from '@screens/Team/components/Tier';
import {TierOneList} from '@screens/Team/components/TierOneList';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

import {TABS} from './mockData';

export const Tiers = () => {
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const onCategoryChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    switcherRef.current?.changeSegment(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <SegmentedControl
        segments={TABS}
        ref={switcherRef}
        style={styles.tabbar}
        onChange={onCategoryChange}
        initialIndex={0}
      />

      <PagerView
        initialPage={0}
        style={styles.container}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        <Contacts />
        <TierOneList />
        <Tier type={TierType.tierTwo} />
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    marginTop: rem(24 * RATIO),
    marginHorizontal: 24,
  },
});
