// SPDX-License-Identifier: ice License 1.0

import {PullToRefreshContainer} from '@components/PullToRefreshContainer';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import Icons from '@screens/HomeFlow/Home/components/Icons';
import IconsSvg from '@screens/HomeFlow/Home/components/IconsSvg';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {PAGE_HEIGHT, Pager} from '@screens/HomeFlow/Home/components/Pager';
import {Tasks} from '@screens/HomeFlow/Home/components/Tasks';
import {Team} from '@screens/HomeFlow/Home/components/Team';
import {useAchievementsWalkthrough} from '@screens/HomeFlow/Home/hooks/useAchievementsWalkthrough';
import {useHandleScrollToParam} from '@screens/HomeFlow/Home/hooks/useHandleScrollToParam';
import {useHomeRefresh} from '@screens/HomeFlow/Home/hooks/useHomeRefresh';
import React, {memo, Profiler} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';

let totalActualDuration: number = 0;
let totalRendersCount = 0;

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {onRefresh, refreshing} = useHomeRefresh();

  const translateY = useSharedValue(0);

  const {animatedScrollViewRef} = useHandleScrollToParam();
  const {elementRef, onElementLayout} = useAchievementsWalkthrough();

  const onRenderProfiler = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    totalActualDuration = totalActualDuration + actualDuration;
    totalRendersCount += 1;

    console.log(
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      totalActualDuration,
      totalRendersCount,
    );
  };

  return (
    <View style={styles.container}>
      {/* <Profiler id="HomeHeader" onRender={onRenderProfiler}> */}
      <HomeHeader translateY={translateY} transitionOffset={PAGE_HEIGHT} />
      {/* </Profiler> */}
      <PullToRefreshContainer
        style={styles.container}
        onScrollTranslateY={translateY}
        onRefresh={onRefresh}
        animatedScrollViewRef={animatedScrollViewRef}
        refreshing={refreshing}>
        <Animated.ScrollView
          ref={animatedScrollViewRef}
          contentContainerStyle={tabBarOffset.current}
          showsVerticalScrollIndicator={false}>
          <Profiler id="Pager" onRender={onRenderProfiler}>
            <Pager />
            <Icons />
            <IconsSvg />
          </Profiler>
          <View style={commonStyles.baseSubScreen}>
            {/* <Profiler id="Overview" onRender={onRenderProfiler}> */}
            <Overview translateY={translateY} topOffset={PAGE_HEIGHT} />
            {/* </Profiler> */}
            {/* <Profiler id="Team" onRender={onRenderProfiler}> */}
            <Team />
            {/* </Profiler> */}
            <View ref={elementRef} onLayout={onElementLayout}>
              {/* <Profiler id="Tasks" onRender={onRenderProfiler}> */}
              <Tasks />
              {/* </Profiler> */}
            </View>
          </View>
        </Animated.ScrollView>
      </PullToRefreshContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
