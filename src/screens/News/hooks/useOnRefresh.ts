// SPDX-License-Identifier: ice License 1.0

import {activeTabSelector} from '@store/modules/ActiveTab/selectors';
import {NewsActions} from '@store/modules/News/actions';
import {NewsSelectors} from '@store/modules/News/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {hapticFeedback} from '@utils/device';
import {useCallback, useEffect, useRef} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

export const useOnRefresh = (animatedIndex: SharedValue<number>) => {
  const dispatch = useDispatch();

  const hasMore = useSelector(NewsSelectors.hasMoreToLoad);

  const refreshing = useSelector(
    isLoadingSelector.bind(null, NewsActions.NEWS_LOAD),
  );

  const onRefresh = useCallback(() => {
    dispatch(
      NewsActions.NEWS_LOAD.START.create({
        isInitial: true,
      }),
    );

    dispatch(NewsActions.UNREAD_NEWS_COUNT_LOAD.START.create());
  }, [dispatch]);

  const onLoadMore = useCallback(() => {
    if (!refreshing && hasMore) {
      dispatch(
        NewsActions.NEWS_LOAD.START.create({
          isInitial: false,
        }),
      );
    }
  }, [dispatch, hasMore, refreshing]);

  const canBeActivatedRef = useRef(false);
  const hapticOnRefresh = () => {
    if (canBeActivatedRef.current) {
      hapticFeedback();
      onRefresh();
      canBeActivatedRef.current = false;
    }
  };

  const resetHapticOnRefresh = () => {
    canBeActivatedRef.current = true;
  };

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.18;
    },
    isNeedRefresh => {
      if (isNeedRefresh) {
        runOnJS(hapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.05 && animatedIndex.value >= -0.1;
    },
    reset => {
      if (reset) {
        runOnJS(resetHapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  const activeTab = useSelector(activeTabSelector);
  useEffect(() => {
    if (activeTab === 'news') {
      onRefresh();
    }
  }, [activeTab, onRefresh]);

  return {onRefresh, refreshing, onLoadMore};
};
