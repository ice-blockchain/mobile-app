// SPDX-License-Identifier: ice License 1.0

import {StatsActions} from '@store/modules/Stats/actions';
import {StatsPeriod} from '@store/modules/Stats/types';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

interface Params {
  statsPeriod: StatsPeriod;
}

export function useOnRefresh({statsPeriod}: Params) {
  const dispatch = useDispatch();

  const refreshing = useSelector(
    isLoadingSelector.bind(null, StatsActions.GET_USER_GROWTH_STATS),
  );

  const onRefresh = useCallback(() => {
    dispatch(StatsActions.GET_USER_GROWTH_STATS.START.create(statsPeriod));
  }, [dispatch, statsPeriod]);

  useEffect(onRefresh, [onRefresh]);

  return {
    refreshing,
    onRefresh,
  };
}
