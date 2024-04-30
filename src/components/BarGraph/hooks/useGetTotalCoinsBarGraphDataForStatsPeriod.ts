// SPDX-License-Identifier: ice License 1.0

import {totalCoinsToGraphData} from '@components/BarGraph/utils/totalCoinsToGraphData';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {StatsPeriod} from '@store/modules/Stats/types';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getTotalCoinsStatsSelector} from '@store/modules/Tokenomics/selectors';
import {TotalCoinsBarGraphData} from '@store/modules/Tokenomics/types';
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useGetTotalCoinsBarGraphDataForStatsPeriod(
  statsPeriod: StatsPeriod,
): TotalCoinsBarGraphData {
  const timeSeries = useSelector(getTotalCoinsStatsSelector(statsPeriod));
  const isSplashHidden = useSelector(isSplashHiddenSelector);

  const totalCoinsBarGraphData: TotalCoinsBarGraphData = useMemo(() => {
    return totalCoinsToGraphData({
      timeSeries,
    });
  }, [timeSeries]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isSplashHidden) {
      dispatch(
        TokenomicsActions.GET_TOTAL_COINS_STATS.START.create(statsPeriod),
      );
    }
  }, [dispatch, statsPeriod, isSplashHidden]);

  return totalCoinsBarGraphData;
}
