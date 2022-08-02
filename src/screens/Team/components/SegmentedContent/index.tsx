// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Contacts} from '@screens/Team/components/Contacts';
import {TierList} from '@screens/Team/components/TierList';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

import {SEGMENTS} from './segments';

type TiersProps = {
  showCountriesList: (t: boolean) => void;
  isCountriesVisible: boolean;
};

enum SegmentIndex {
  ContactList,
  Tier1List,
  Tier2List,
}

export const SegmentedContent = (props: TiersProps) => {
  const [activeIndex, setActiveIndex] = useState<SegmentIndex>(0);
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const onCategoryChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(event.nativeEvent.position);
    switcherRef.current?.changeSegment(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <SegmentedControl
        segments={SEGMENTS}
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
        <View style={styles.container}>
          <Contacts
            {...props}
            focused={activeIndex === SegmentIndex.ContactList}
          />
        </View>
        <View style={styles.container}>
          <TierList
            referralType="T1"
            emptyTitle="team.tierOne_tab"
            headerTitle="team.tier_one.header_list.title_earnings"
            focused={activeIndex === SegmentIndex.Tier1List}
          />
        </View>
        <View style={styles.container}>
          <TierList
            referralType="T2"
            emptyTitle="team.tierTwo_tab"
            headerTitle="team.tier_two.header_list.title_earnings"
            focused={activeIndex === SegmentIndex.Tier2List}
          />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    marginTop: rem(24),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
