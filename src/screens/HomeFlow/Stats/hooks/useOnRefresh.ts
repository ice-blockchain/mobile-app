// SPDX-License-Identifier: ice License 1.0

import {COUNTRIES_COUNT} from '@screens/HomeFlow/Stats/components/TopCountries';
import {MINERS_COUNT} from '@screens/HomeFlow/Stats/components/TopMiners';
import {DEFAULT_USER_GROWTH_STATS_PERIOD} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph';
import {CollectionActions} from '@store/modules/Collections';
import {StatsActions} from '@store/modules/Stats/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useOnRefresh() {
  const dispatch = useDispatch();

  const refreshing = useSelector(
    (state: RootState) =>
      isLoadingSelector(StatsActions.GET_USER_GROWTH_STATS, state) ||
      isLoadingSelector(CollectionActions.GET_TOP_MINERS, state) ||
      isLoadingSelector(CollectionActions.GET_TOP_STATS_COUNTRIES, state),
  );

  const onRefresh = useCallback(() => {
    dispatch(
      StatsActions.GET_USER_GROWTH_STATS.START.create(
        DEFAULT_USER_GROWTH_STATS_PERIOD,
      ),
    );

    dispatch(
      CollectionActions.GET_TOP_MINERS.START.create({
        isInitial: true,
        limit: MINERS_COUNT,
      }),
    );

    dispatch(
      CollectionActions.GET_TOP_STATS_COUNTRIES.START.create({
        isInitial: true,
        limit: COUNTRIES_COUNT,
      }),
    );
  }, [dispatch]);

  useEffect(onRefresh, [onRefresh]);

  return {
    refreshing,
    onRefresh,
  };
}
