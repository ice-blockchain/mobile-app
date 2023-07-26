// SPDX-License-Identifier: ice License 1.0

import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  CARD_MARGIN_RIGHT_WIDTH,
  CARD_WIDTH,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {OVERSCROLL} from '@screens/HomeFlow/Home/components/Overview/constants';
import {ActiveOverviewCard} from '@screens/HomeFlow/Home/types';
import {useEffect} from 'react';
import Animated, {useAnimatedRef} from 'react-native-reanimated';

export function getActiveOffset(
  activeOverviewCard: ActiveOverviewCard | undefined,
): number {
  if (activeOverviewCard != null) {
    switch (activeOverviewCard) {
      case 'profile':
        return OVERSCROLL;
      case 'referral':
        return OVERSCROLL + CARD_WIDTH - CARD_MARGIN_RIGHT_WIDTH;
      case 'adoption':
        return OVERSCROLL + CARD_WIDTH * 2 - CARD_MARGIN_RIGHT_WIDTH;
    }
  }
  return 0;
}

export function useHandleActiveOverviewCardParam() {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const route = useRoute<RouteProp<HomeTabStackParamList, 'Home'>>();
  useEffect(() => {
    if (route.params?.activeOverviewCard && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: getActiveOffset(route.params?.activeOverviewCard),
        y: 0,
        animated: true,
      });
    }
  }, [route.params?.activeOverviewCard, scrollViewRef]);

  return {scrollViewRef};
}
