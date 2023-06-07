// SPDX-License-Identifier: ice License 1.0

import {ChatTabsParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SEARCH_HIDDEN_Y} from '@screens/ChatFlow/ChatList/constants';
import {useEffect} from 'react';
import {
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedSearch() {
  const route = useRoute<
    | RouteProp<ChatTabsParamList, 'ExploreTab'>
    | RouteProp<ChatTabsParamList, 'ChatListTab'>
  >();
  const {searchVisible} = route.params ?? {};
  const searchVisibleSharedValue = useSharedValue(0);
  const translateY = useSharedValue(SEARCH_HIDDEN_Y);
  const sharedScrollPosition = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  useEffect(() => {
    if (route.params?.searchVisible) {
      translateY.value = withTiming(0);
      searchVisibleSharedValue.value = 1;
    }
  }, [route.params, searchVisibleSharedValue, translateY]);

  useAnimatedReaction(
    () => {
      return sharedScrollPosition.value;
    },
    (result, previous) => {
      if (
        searchVisibleSharedValue.value &&
        result !== previous &&
        result > 0 &&
        result > (previous ?? 0)
      ) {
        translateY.value = withTiming(SEARCH_HIDDEN_Y);
        searchVisibleSharedValue.value = 0;
      }
    },
    [searchVisible],
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    sharedScrollPosition.value = event.contentOffset.y;
  });

  return {scrollHandler, animatedStyle, searchVisible};
}
