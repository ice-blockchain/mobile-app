// SPDX-License-Identifier: ice License 1.0

import {SEARCH_HIDDEN_Y} from '@screens/ChatFlow/Messages/constants';
import {ChatActions} from '@store/modules/Chat/actions';
import {messagesSearchVisibleSelector} from '@store/modules/Chat/selectors';
import * as React from 'react';
import {useEffect} from 'react';
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

export function useAnimatedSearch() {
  const searchVisible = useSelector(messagesSearchVisibleSelector);
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
    if (searchVisible) {
      translateY.value = withTiming(0);
    }
  }, [searchVisible, translateY]);

  const dispatch = useDispatch();
  const setSearchBarHidden = React.useCallback(() => {
    dispatch(
      ChatActions.SET_MESSAGES_SEARCH_VISIBLE.STATE.create({
        visible: false,
      }),
    );
  }, [dispatch]);

  useAnimatedReaction(
    () => {
      return sharedScrollPosition.value;
    },
    (result, previous) => {
      if (searchVisible) {
        if (result !== previous && result > 0 && result > (previous ?? 0)) {
          translateY.value = withTiming(SEARCH_HIDDEN_Y);
          runOnJS(setSearchBarHidden)();
        }
      }
    },
    [searchVisible, setSearchBarHidden],
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    sharedScrollPosition.value = event.contentOffset.y;
  });

  return {scrollHandler, animatedStyle};
}
