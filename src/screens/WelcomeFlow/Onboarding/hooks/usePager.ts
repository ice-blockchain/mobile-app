// SPDX-License-Identifier: ice License 1.0

import {useRef, useState} from 'react';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';

type Params = {
  totalPages: number;
};

export const usePager = ({totalPages}: Params) => {
  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const goNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < totalPages) {
      pagerViewRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return {goNextPage, onPageSelected, currentPage, pagerViewRef};
};
