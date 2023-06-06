// SPDX-License-Identifier: ice License 1.0

import {SEARCH_HIDDEN_Y} from '@screens/ChatFlow/Messages/constants';
import {ChatActions} from '@store/modules/Chats/actions';
import {getSearchVisibleSelector} from '@store/modules/Chats/selectors';
import {ChatDataType} from '@store/modules/Chats/types';
import {useCallback, useEffect} from 'react';
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

export function useAnimatedSearch(dataType: ChatDataType) {
  const searchVisible = useSelector(getSearchVisibleSelector(dataType));
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
  const setSearchBarHidden = useCallback(() => {
    dispatch(
      ChatActions.SET_SEARCH_VISIBLE.STATE.create({
        visible: false,
        dataType,
      }),
    );
  }, [dataType, dispatch]);

  useAnimatedReaction(
    () => {
      return sharedScrollPosition.value;
    },
    (result, previous) => {
      if (
        searchVisible &&
        result !== previous &&
        result > 0 &&
        result > (previous ?? 0)
      ) {
        translateY.value = withTiming(SEARCH_HIDDEN_Y);
        runOnJS(setSearchBarHidden)();
      }
    },
    [searchVisible, setSearchBarHidden],
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    sharedScrollPosition.value = event.contentOffset.y;
  });

  return {scrollHandler, animatedStyle, searchVisible};
}
