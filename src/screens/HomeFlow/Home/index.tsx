// SPDX-License-Identifier: ice License 1.0

import {PullToRefreshContainer} from '@components/PullToRefreshContainer';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import Icons from '@screens/HomeFlow/Home/components/Icons';
import IconsIcoMoon from '@screens/HomeFlow/Home/components/IconsIcoMoon';
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

let totalActualPngDuration: number = 0;
let totalRendersPngCount = 0;

let totalActualSvgDuration: number = 0;
let totalRendersSvgCount = 0;

let totalActualMoonDuration: number = 0;
let totalRendersMoonCount = 0;

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {onRefresh, refreshing} = useHomeRefresh();

  const translateY = useSharedValue(0);

  const {animatedScrollViewRef} = useHandleScrollToParam();
  const {elementRef, onElementLayout} = useAchievementsWalkthrough();

  const onRenderIconsSVG = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    totalActualSvgDuration = totalActualSvgDuration + actualDuration;
    totalRendersSvgCount += 1;

    console.log(
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      totalActualSvgDuration,
      totalRendersSvgCount,
    );
  };

  const onRenderIconsPNG = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    totalActualPngDuration = totalActualPngDuration + actualDuration;
    totalRendersPngCount += 1;

    console.log(
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      totalActualPngDuration,
      totalRendersPngCount,
    );
  };

  const onRenderIconsMoon = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    totalActualMoonDuration = totalActualMoonDuration + actualDuration;
    totalRendersMoonCount += 1;

    console.log(
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      totalActualMoonDuration,
      totalRendersMoonCount,
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader translateY={translateY} transitionOffset={PAGE_HEIGHT} />
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
          <Pager />
          <Profiler id="Icons" onRender={onRenderIconsPNG}>
            <Icons />
          </Profiler>
          <Profiler id="IconsSvg" onRender={onRenderIconsSVG}>
            <IconsSvg />
          </Profiler>
          <Profiler id="IconsIcoMoon" onRender={onRenderIconsMoon}>
            <IconsIcoMoon />
          </Profiler>

          <View style={commonStyles.baseSubScreen}>
            <Overview translateY={translateY} topOffset={PAGE_HEIGHT} />
            <Team />
            <View ref={elementRef} onLayout={onElementLayout}>
              <Tasks />
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
