// SPDX-License-Identifier: ice License 1.0

import {PagerIndicators} from '@components/PagerIndicators';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Engagement} from '@screens/HomeFlow/Home/components/Pager/components/Engagement';
import {MiningRate} from '@screens/HomeFlow/Home/components/Pager/components/MiningRate';
import {Wallet} from '@screens/HomeFlow/Home/components/Pager/components/Wallet';
import React, {useState} from 'react';
import {PixelRatio} from 'react-native';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

export const PAGE_HEIGHT = PixelRatio.roundToNearestPixel(rem(160));

export const Pager = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(event.nativeEvent.position);
  };

  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <PagerView
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: PAGE_HEIGHT,
    backgroundColor: COLORS.primaryLight,
  },
  pager: {
    height: PAGE_HEIGHT,
  },
  slide: {
    flex: 1,
  },
  indicators: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
