// SPDX-License-Identifier: ice License 1.0

import {BalanceDiff, BalanceHistoryPoint} from '@api/tokenomics/types';
import {Filter} from '@screens/HomeFlow/BalanceHistory/components/Filters';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {balanceHistorySelector} from '@store/modules/Tokenomics/selectors';
import {getBalanceHistoryLength} from '@store/modules/Tokenomics/utils/getBalanceHistoryLength';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export type HistorySection = {
  time: string;
  balance: BalanceDiff;
  data: BalanceHistoryPoint[];
  collapsed?: boolean;
};

export const useGetHistorySections = ({
  selectedFilter,
}: {
  selectedFilter: Filter;
}) => {
  const dispatch = useDispatch();
  const [sections, setSections] = useState<HistorySection[]>([]);
  const balanceHistory = useSelector(balanceHistorySelector);
  const loading = useSelector(
    isLoadingSelector.bind(null, TokenomicsActions.GET_BALANCE_HISTORY),
  );

  useEffect(() => {
    setSections([]);
    dispatch(
      TokenomicsActions.GET_BALANCE_HISTORY.START.create({
        offset: 0,
        startDate: selectedFilter.start,
        endDate: selectedFilter.end,
      }),
    );
  }, [dispatch, selectedFilter]);

  useEffect(() => {
    setSections(
      (balanceHistory.data ?? []).map(section => {
        return {
          time: section.time,
          balance: section.balance,
          data: section.timeSeries ?? [],
        };
      }),
    );
  }, [balanceHistory]);

  const toggleSection = useCallback((section: HistorySection) => {
    setSections(currentSections => {
      const index = currentSections.indexOf(section);
      const nextSections = [...currentSections];
      nextSections[index] = {
        ...currentSections[index],
        collapsed: !currentSections[index].collapsed,
      };
      return nextSections;
    });
  }, []);

  const loadNext = useCallback(() => {
    if (balanceHistory.hasNext && !loading) {
      dispatch(
        TokenomicsActions.GET_BALANCE_HISTORY.START.create({
          offset: getBalanceHistoryLength(balanceHistory.data ?? []),
          startDate: selectedFilter.start,
          endDate: selectedFilter.end,
        }),
      );
    }
  }, [balanceHistory, dispatch, loading, selectedFilter]);

  return {sections, loadNext, toggleSection, loading};
};
