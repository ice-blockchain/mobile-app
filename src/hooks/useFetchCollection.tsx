// SPDX-License-Identifier: ice License 1.0

import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {ActionFactories} from '@store/utils/actions/createAction';
import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type Params<T> = {
  selector: (state: RootState) => {
    data: T[];
    hasNext: boolean;
    query?: string;
  };
  action: ActionFactories<
    string,
    {
      START: (params: {
        offset: number;
        limit?: number;
        query?: string;
      }) => unknown;
    }
  >;
  options?: {pageSize?: number};
};

export const useFetchCollection = <T,>({
  selector,
  action,
  options,
}: Params<T>) => {
  const dispatch = useDispatch();
  const {data, query: searchQuery, hasNext} = useSelector(selector);
  const refreshingRef = useRef(false);
  const loadNextLoadingRef = useRef(false);

  const error = useSelector(failedReasonSelector.bind(null, action));

  const loading = useSelector(isLoadingSelector.bind(null, action));

  if (refreshingRef.current && !loading) {
    refreshingRef.current = false;
  }

  if (loadNextLoadingRef.current && !loading) {
    loadNextLoadingRef.current = false;
  }

  const fetch = useCallback(
    ({offset, query}: {offset: number; query?: string}) => {
      dispatch(action.START.create({query, offset, limit: options?.pageSize}));
    },
    [action.START, dispatch, options?.pageSize],
  );

  const loadNext = useCallback(() => {
    if (hasNext && !loading) {
      loadNextLoadingRef.current = true;
      fetch({query: searchQuery, offset: data.length});
    }
  }, [fetch, loading, hasNext, searchQuery, data.length]);

  const refresh = useCallback(() => {
    refreshingRef.current = true;
    fetch({query: searchQuery, offset: 0});
  }, [fetch, searchQuery]);

  const refreshing = loading && refreshingRef.current;
  const loadNextLoading = loading && loadNextLoadingRef.current;

  return {
    data,
    searchQuery,
    error,
    hasNext,
    loadNext,
    loadNextLoading,
    refresh,
    refreshing,
    fetch,
    loading,
  };
};
