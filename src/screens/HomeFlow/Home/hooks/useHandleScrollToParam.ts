// SPDX-License-Identifier: ice License 1.0

import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {useEffect} from 'react';
import Animated, {scrollTo, useAnimatedRef} from 'react-native-reanimated';

export function useHandleScrollToParam() {
  const route = useRoute<RouteProp<HomeTabStackParamList, 'Home'>>();

  const animatedScrollViewRef = useAnimatedRef<Animated.ScrollView>();
  useEffect(() => {
    if (route.params?.scrollTo && animatedScrollViewRef.current) {
      switch (route.params.scrollTo) {
        case 'overview':
          scrollTo(animatedScrollViewRef, 0, PAGE_HEIGHT, true);
          break;
      }
    }
  }, [route.params, animatedScrollViewRef]);

  return {animatedScrollViewRef};
}
