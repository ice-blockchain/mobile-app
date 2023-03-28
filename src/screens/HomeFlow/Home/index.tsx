// SPDX-License-Identifier: ice License 1.0

import {RefreshControl} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {PAGE_HEIGHT, Pager} from '@screens/HomeFlow/Home/components/Pager';
import {Tasks} from '@screens/HomeFlow/Home/components/Tasks';
import {Team} from '@screens/HomeFlow/Home/components/Team';
import {useAchievementsWalkthrough} from '@screens/HomeFlow/Home/hooks/useAchievementsWalkthrough';
import {useHandleScrollToParam} from '@screens/HomeFlow/Home/hooks/useHandleScrollToParam';
import {useHomeRefresh} from '@screens/HomeFlow/Home/hooks/useHomeRefresh';
import {useScrollHandler} from '@screens/HomeFlow/Home/hooks/useScrollHandler';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, translateY} = useScrollHandler();
  const {onRefresh, refreshing} = useHomeRefresh();

  const {scrollViewRef} = useHandleScrollToParam();
  const {elementRef, onElementLayout} = useAchievementsWalkthrough();

  return (
    <View style={styles.container}>
      <HomeHeader translateY={translateY} transitionOffset={PAGE_HEIGHT} />
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={tabBarOffset.current}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            translateY={translateY}
          />
        }>
        <Pager />
        <View style={commonStyles.baseSubScreen}>
          <Overview translateY={translateY} topOffset={PAGE_HEIGHT} />
          <Team />
          <View ref={elementRef} onLayout={onElementLayout}>
            <Tasks />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
