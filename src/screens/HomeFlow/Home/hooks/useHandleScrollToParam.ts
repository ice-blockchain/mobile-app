// SPDX-License-Identifier: ice License 1.0

import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {useEffect, useRef} from 'react';
import Animated from 'react-native-reanimated';

export function useHandleScrollToParam() {
  const route = useRoute<RouteProp<HomeTabStackParamList, 'Home'>>();

  const scrollViewRef = useRef<Animated.ScrollView>(null);
  useEffect(() => {
    if (route.params?.scrollTo && scrollViewRef.current) {
      switch (route.params.scrollTo) {
        case 'overview':
          scrollViewRef.current.scrollTo({
            y: PAGE_HEIGHT,
            x: 0,
            animated: true,
          });
          break;
      }
    }
  }, [route.params?.scrollTo]);

  return {scrollViewRef};
}
