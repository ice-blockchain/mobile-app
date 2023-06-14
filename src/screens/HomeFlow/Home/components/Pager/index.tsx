// SPDX-License-Identifier: ice License 1.0

import {PagerIndicators} from '@components/PagerIndicators';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DISTANCE_TO_OVERLAP} from '@screens/HomeFlow/Home/components/constants';
import {Engagement} from '@screens/HomeFlow/Home/components/Pager/components/Engagement';
import {MiningRate} from '@screens/HomeFlow/Home/components/Pager/components/MiningRate';
import {Wallet} from '@screens/HomeFlow/Home/components/Pager/components/Wallet';
import {usePagerCardsWalkthrough} from '@screens/HomeFlow/Home/components/Pager/hooks/usePagerCardsWalkthrough';
import {ActivePagerCard} from '@screens/HomeFlow/Home/types';
import React, {memo, useEffect, useRef, useState} from 'react';
import {PixelRatio} from 'react-native';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

export const PAGE_HEIGHT = PixelRatio.roundToNearestPixel(rem(160));

function getActiveIndex(activePagerCard: ActivePagerCard | undefined): number {
  if (activePagerCard != null) {
    switch (activePagerCard) {
      case 'wallet':
        return 0;
      case 'earning':
        return 1;
      case 'engagement':
        return 2;
    }
  }
  return 0;
}

export const Pager = memo(() => {
  const route = useRoute<RouteProp<HomeTabStackParamList, 'Home'>>();
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);
  useEffect(() => {
    if (pagerViewRef.current?.setPage) {
      pagerViewRef.current.setPage(
        getActiveIndex(route.params?.activePagerCard),
      );
    }
  }, [route.params?.activePagerCard]);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    console.log('onPageChange');
    if (activeIndex !== event.nativeEvent.position) {
      setActiveIndex(event.nativeEvent.position);
    }
  };

  const {onElementLayout, elementRef} = usePagerCardsWalkthrough();

  console.log('Pager rerender');
  return (
    <View
      style={[commonStyles.baseSubScreen, styles.container]}
      onLayout={onElementLayout}
      ref={elementRef}>
      <PagerView
        ref={pagerViewRef}
        initialPage={activeIndex}
        onPageSelected={onPageChange}
        style={styles.pager}>
        <View style={styles.slide}>
          <Wallet />
        </View>
        <View style={styles.slide}>
          <MiningRate />
        </View>
        <View style={styles.slide}>
          <Engagement />
        </View>
      </PagerView>
      <PagerIndicators
        activeIndex={activeIndex}
        style={styles.indicators}
        total={3}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: PAGE_HEIGHT + DISTANCE_TO_OVERLAP,
    backgroundColor: COLORS.primaryLight,
    paddingBottom: DISTANCE_TO_OVERLAP,
  },
  pager: {
    height: PAGE_HEIGHT,
  },
  slide: {
    flex: 1,
  },
  indicators: {
    position: 'absolute',
    bottom: DISTANCE_TO_OVERLAP,
    alignSelf: 'center',
  },
});
