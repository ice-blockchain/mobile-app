// SPDX-License-Identifier: ice License 1.0

import {timeSeriesToUsersData} from '@components/BarGraph/utils/timeSeriesToGraphData';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {StatsActions} from '@store/modules/Stats/actions';
import {getUserGrowthStatsSelector} from '@store/modules/Stats/selectors';
import {StatsPeriod, UsersBarGraphData} from '@store/modules/Stats/types';
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useGetBarGraphDataForStatsPeriod(
  statsPeriod: StatsPeriod,
): UsersBarGraphData {
  const timeSeries = useSelector(getUserGrowthStatsSelector(statsPeriod));
  const isSplashHidden = useSelector(isSplashHiddenSelector);

  const usersBarGraphData: UsersBarGraphData = useMemo(() => {
    return timeSeriesToUsersData({
      timeSeries,
    });
  }, [timeSeries]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isSplashHidden) {
      dispatch(StatsActions.GET_USER_GROWTH_STATS.START.create(statsPeriod));
    }
  }, [dispatch, statsPeriod, isSplashHidden]);

  return usersBarGraphData;
}
