// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useReferrals = (referralType: ReferralType, focused: boolean) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const referrals = useSelector(referralsSelector(userId, referralType));
  const refreshingRef = useRef(false);
  const loadNextLoadingRef = useRef(false);

  const error = useSelector(
    failedReasonSelector.bind(
      null,
      ReferralsActions.GET_REFERRALS(referralType),
    ),
  );

  const loading = useSelector(
    isLoadingSelector.bind(null, ReferralsActions.GET_REFERRALS(referralType)),
  );

  if (refreshingRef.current && !loading) {
    refreshingRef.current = false;
  }

  if (loadNextLoadingRef.current && !loading) {
    loadNextLoadingRef.current = false;
  }

  useEffect(() => {
    if (focused) {
      dispatch(
        ReferralsActions.GET_REFERRALS(referralType).START.create(
          userId,
          referralType,
          0,
        ),
      );
    }
  }, [dispatch, referralType, userId, focused]);

  const loadNext = useCallback(() => {
    if (referrals && referrals.total > referrals.referrals.length) {
      loadNextLoadingRef.current = true;
      dispatch(
        ReferralsActions.GET_REFERRALS(referralType).START.create(
          userId,
          referralType,
          referrals.referrals.length,
        ),
      );
    }
  }, [dispatch, referralType, referrals, userId]);

  const refresh = useCallback(() => {
    refreshingRef.current = true;
    dispatch(
      ReferralsActions.GET_REFERRALS(referralType).START.create(
        userId,
        referralType,
        0,
      ),
    );
  }, [dispatch, referralType, userId]);

  const refreshing = loading && refreshingRef.current;
  const loadNextLoading = loading && loadNextLoadingRef.current;

  return {
    referrals,
    error,
    loading,
    loadNext,
    loadNextLoading,
    refresh,
    refreshing,
  };
};
