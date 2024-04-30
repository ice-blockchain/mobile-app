// SPDX-License-Identifier: ice License 1.0

import {PullToRefreshContainer} from '@components/PullToRefreshContainer';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {BscAddress} from '@screens/HomeFlow/Home/components/BscAddress';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import {JoinMainnet} from '@screens/HomeFlow/Home/components/JoinMainnet';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {PAGE_HEIGHT, Pager} from '@screens/HomeFlow/Home/components/Pager';
import {Quiz} from '@screens/HomeFlow/Home/components/Quiz';
import {Roadmap} from '@screens/HomeFlow/Home/components/Roadmap';
import {SocialLinks} from '@screens/HomeFlow/Home/components/SocialLinks';
import {Tasks} from '@screens/HomeFlow/Home/components/Tasks';
import {Team} from '@screens/HomeFlow/Home/components/Team';
import {useAchievementsWalkthrough} from '@screens/HomeFlow/Home/hooks/useAchievementsWalkthrough';
import {useHandleScrollToParam} from '@screens/HomeFlow/Home/hooks/useHandleScrollToParam';
import {useHomeRefresh} from '@screens/HomeFlow/Home/hooks/useHomeRefresh';
import {isAchievementsEnabledSelector} from '@store/modules/Account/selectors';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {onRefresh, refreshing} = useHomeRefresh();

  const translateY = useSharedValue(0);

  const {animatedScrollViewRef} = useHandleScrollToParam();
  const {elementRef, onElementLayout} = useAchievementsWalkthrough();
  const isAchievementsEnabled = useSelector(isAchievementsEnabledSelector);

  const showTasks = !isLightDesign || isAchievementsEnabled;

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
          <View style={commonStyles.baseSubScreen}>
            <Overview translateY={translateY} topOffset={PAGE_HEIGHT} />
            <View style={isLightDesign ? styles.section : undefined}>
              <Team />
            </View>
            <Quiz />
            <BscAddress />
            <Roadmap />
            <JoinMainnet />
            <View ref={elementRef} onLayout={onElementLayout}>
              {showTasks ? <Tasks /> : null}
            </View>
            <SocialLinks />
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
  section: {
    marginTop: -rem(24),
  },
});
