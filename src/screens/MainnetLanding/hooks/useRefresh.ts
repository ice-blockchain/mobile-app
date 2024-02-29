// SPDX-License-Identifier: ice License 1.0

import {StatsActions} from '@store/modules/Stats/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useDispatch, useSelector} from 'react-redux';

export const useRefresh = () => {
  const dispatch = useDispatch();

  const onRefresh = () =>
    dispatch(StatsActions.GET_ICE_COIN_STATS.START.create());

  const refreshing = useSelector(
    isLoadingSelector.bind(null, StatsActions.GET_ICE_COIN_STATS),
  );

  return {onRefresh, refreshing};
};
