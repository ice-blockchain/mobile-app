// SPDX-License-Identifier: ice License 1.0

import {StatsActions} from '@store/modules/Stats/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useOnRefresh() {
  const dispatch = useDispatch();

  const refreshing = useSelector((state: RootState) =>
    isLoadingSelector(StatsActions.GET_USER_GROWTH_STATS, state),
  );

  const onRefresh = useCallback(() => {
    dispatch(StatsActions.GET_USER_GROWTH_STATS.START.create(3));
  }, [dispatch]);

  useEffect(onRefresh, [onRefresh]);

  return {
    refreshing,
    onRefresh,
  };
}
