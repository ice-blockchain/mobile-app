// SPDX-License-Identifier: ice License 1.0

import {SegmentedControlMethods} from '@components/SegmentedControl';
import {useCallback, useRef, useState} from 'react';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';

export enum SegmentIndex {
  ContactList,
  Tier1List,
  Tier2List,
  LogsList,
}

export const useSegmentedMethods = () => {
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const [activeIndex, setActiveIndex] = useState<SegmentIndex>(0);

  const onSegmentedControlChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(event.nativeEvent.position);
    switcherRef.current?.changeSegment(event.nativeEvent.position);
  };

  return {
    activeIndex,
    onPageChange,
    onSegmentedControlChange,
    switcherRef,
    pagerRef,
  };
};
