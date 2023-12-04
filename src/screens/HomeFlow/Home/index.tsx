// SPDX-License-Identifier: ice License 1.0

import {PullToRefreshContainer} from '@components/PullToRefreshContainer';
import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {EthereumAddress} from '@screens/HomeFlow/Home/components/EthereumAddress';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import {useVerifiedTooltip} from '@screens/HomeFlow/Home/components/Header/components/hooks/useVerifiedTooltip';
import {VerifiedTooltip} from '@screens/HomeFlow/Home/components/Header/components/VerifiedTooltip';
import {JoinMainnet} from '@screens/HomeFlow/Home/components/JoinMainnet';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {PAGE_HEIGHT, Pager} from '@screens/HomeFlow/Home/components/Pager';
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

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {onRefresh, refreshing} = useHomeRefresh();

  const translateY = useSharedValue(0);

  const {animatedScrollViewRef} = useHandleScrollToParam();
  const {elementRef, onElementLayout} = useAchievementsWalkthrough();
  const isAchievementsEnabled = useSelector(isAchievementsEnabledSelector);
  const {chevronRef, handleChevronPress, isTooltipVisible, tooltipStyle} =
    useVerifiedTooltip();

  const showTasks = !isLiteTeam || isAchievementsEnabled;

  return (
    <View style={styles.container}>
      <HomeHeader
        translateY={translateY}
        transitionOffset={PAGE_HEIGHT}
        chevronRef={chevronRef}
        onVerifiedChevronPress={handleChevronPress}
      />
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
            <Team showEmptyTeamView={!showTasks} />
            <EthereumAddress />
            <Roadmap />
            <JoinMainnet />
            <View ref={elementRef} onLayout={onElementLayout}>
              {showTasks ? <Tasks /> : null}
            </View>
            <SocialLinks />
          </View>
        </Animated.ScrollView>
      </PullToRefreshContainer>
      {isTooltipVisible && <VerifiedTooltip style={tooltipStyle} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
