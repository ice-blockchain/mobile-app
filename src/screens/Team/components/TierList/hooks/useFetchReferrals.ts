// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {useEffect, useMemo, useRef} from 'react';

export const useFetchReferrals = ({
  referralType,
  focused,
}: {
  referralType: ReferralType;
  focused: boolean;
}) => {
  const {
    fetch,
    data: referrals,
    hasNext,
    loadNext,
    refreshing,
    loadNextLoading,
  } = useFetchCollection(
    useMemo(
      () => ({
        selector: referralsSelector({referralType}),
        action: ReferralsActions.GET_REFERRALS({referralType})(referralType),
      }),
      [referralType],
    ),
  );

  const hasBeenFetchedRef = useRef(false);
  useEffect(() => {
    if (focused && !hasBeenFetchedRef.current) {
      hasBeenFetchedRef.current = true;
      fetch({isInitial: true});
    }
  }, [fetch, focused, hasBeenFetchedRef]);

  return {fetch, referrals, hasNext, loadNext, refreshing, loadNextLoading};
};
