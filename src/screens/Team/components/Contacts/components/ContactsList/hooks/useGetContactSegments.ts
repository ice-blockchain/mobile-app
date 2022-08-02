// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {contactsSelector} from '@store/modules/Team/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {useCallback, useEffect, useRef} from 'react';
import {Contact} from 'react-native-contacts';
import {useDispatch, useSelector} from 'react-redux';

export type ContactSection = {
  id: 'friends' | 'contacts';
  title?: string;
};

export type ContactSectionDataItem =
  | Contact
  | User
  | {element: 'Loading'}
  | {element: 'InviteFriendsButton'}
  | {element: 'Error'; message: string};

export const useGetContactSegments = (focused: boolean) => {
  const dispatch = useDispatch();
  const refreshingRef = useRef(false);
  const loadNextLoadingRef = useRef(false);
  const userId = useSelector(userIdSelector);
  const contacts = useSelector(contactsSelector);
  const referrals = useSelector(referralsSelector(userId, 'CONTACTS'));
  const failedReason = useSelector(
    failedReasonSelector.bind(null, ReferralsActions.GET_REFERRALS('CONTACTS')),
  );
  const loading = useSelector(
    isLoadingSelector.bind(null, ReferralsActions.GET_REFERRALS('CONTACTS')),
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
        ReferralsActions.GET_REFERRALS('CONTACTS').START.create(
          userId,
          'CONTACTS',
          0,
        ),
      );
    }
  }, [dispatch, userId, focused]);

  const loadNext = useCallback(() => {
    if (referrals && referrals.total > referrals.referrals.length) {
      loadNextLoadingRef.current = true;
      dispatch(
        ReferralsActions.GET_REFERRALS('CONTACTS').START.create(
          userId,
          'CONTACTS',
          referrals.referrals.length,
        ),
      );
    }
  }, [dispatch, referrals, userId]);

  const refresh = useCallback(() => {
    refreshingRef.current = true;
    dispatch(
      ReferralsActions.GET_REFERRALS('CONTACTS').START.create(
        userId,
        'CONTACTS',
        0,
      ),
    );
  }, [dispatch, userId]);

  const refreshing = loading && refreshingRef.current;
  const loadNextLoading = loading && loadNextLoadingRef.current;

  let iceFriends: ContactSectionDataItem[] = [];
  if (!referrals) {
    iceFriends = failedReason
      ? [{element: 'Error', message: failedReason}]
      : [{element: 'Loading'}, {element: 'Loading'}];
  } else {
    iceFriends =
      referrals.total > 0
        ? referrals.referrals
        : [{element: 'InviteFriendsButton'}];
  }

  const sections: (ContactSection & {data: ContactSectionDataItem[]})[] = [
    {
      id: 'friends',
      data: iceFriends,
    },
  ];

  /**
   * Populate contacts section only when all the referrals are loaded or were failed to load
   */
  if (
    (referrals && referrals.total === referrals.referrals.length) ||
    failedReason
  ) {
    sections.push({
      id: 'contacts',
      title: t('team.contacts_list.all_contacts'),
      data: contacts,
    });
  }

  return {sections, loading, loadNext, loadNextLoading, refresh, refreshing};
};
