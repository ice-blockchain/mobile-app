// SPDX-License-Identifier: ice License 1.0

import {HOME_REFRESH_MIN_INTERVAL_SEC} from '@constants/timeouts';
import {dayjs} from '@services/dayjs';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {StartActionFactories} from '@store/utils/actions/createAction';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useRefresh = (refreshActions: StartActionFactories[]) => {
  const refreshTime = useRef(dayjs().valueOf());
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    const now = dayjs().valueOf();
    if (now - refreshTime.current > HOME_REFRESH_MIN_INTERVAL_SEC * 1000) {
      refreshTime.current = now;

      setRefreshing(true);

      refreshActions.forEach(action => {
        dispatch(action.START.create());
      });
    }
  }, [dispatch, refreshActions]);

  const isManualUpdateLoading = useSelector((state: RootState) => {
    return !!refreshActions.find(action => isLoadingSelector(action, state));
  });

  useEffect(() => {
    if (refreshing && !isManualUpdateLoading) {
      setRefreshing(false);
    }
  }, [isManualUpdateLoading, refreshing]);

  return {onRefresh, refreshing};
};
