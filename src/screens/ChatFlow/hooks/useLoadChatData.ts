// SPDX-License-Identifier: ice License 1.0

import {ChatActions} from '@store/modules/Chat/actions';
import {getLoadingChatDataSelector} from '@store/modules/Chat/selectors';
import {ChatDataType} from '@store/modules/Chat/types';
import debounce from 'lodash/debounce';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useLoadChatData(dataType: ChatDataType) {
  const loading = useSelector(getLoadingChatDataSelector(dataType));
  const refreshingRef = useRef(false);
  if (refreshingRef.current && !loading) {
    refreshingRef.current = false;
  }

  const [searchValue, setSearchValue] = useState('');
  const onChangeText = useMemo(() => debounce(setSearchValue, 600), []);

  const dispatch = useDispatch();
  const refreshData = useCallback(() => {
    dispatch(
      ChatActions.LOAD_CHAT_DATA.START.create({
        initial: true,
        dataType,
        searchValue,
      }),
    );
    refreshingRef.current = true;
  }, [dataType, dispatch, searchValue]);

  const loadMore = useCallback(() => {
    if (!loading) {
      dispatch(
        ChatActions.LOAD_CHAT_DATA.START.create({dataType, searchValue}),
      );
    }
  }, [dataType, dispatch, searchValue, loading]);

  useEffect(refreshData, [refreshData]);

  return {
    refreshData,
    loadMore,
    loading,
    searchValue,
    onChangeText,
    refreshing: loading && refreshingRef.current,
  };
}
