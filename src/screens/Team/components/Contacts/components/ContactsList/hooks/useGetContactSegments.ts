// SPDX-License-Identifier: BUSL-1.1

import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {contactsSelector} from '@store/modules/Team/selectors';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useGetContactSegments = (focused: boolean) => {
  const userId = useSelector(userIdSelector);
  const contacts = useSelector(contactsSelector);
  const referrals = useSelector(referralsSelector(userId, 'CONTACTS'));
  const failedReason = useSelector(
    failedReasonSelector.bind(null, ReferralsActions.GET_REFERRALS('CONTACTS')),
  );
  const dispatch = useDispatch();

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

  let iceFriends = [];
  if (!referrals) {
    iceFriends = failedReason ? [failedReason] : ['Loading', 'Loading'];
  } else {
    iceFriends =
      referrals.total > 0 ? referrals.referrals : ['InviteFriendsButton'];
  }

  const sections = [
    {
      title: 'iceFriends',
      data: iceFriends,
    },
    {
      title: t('team.contacts_list.all_contacts'),
      data: contacts,
    },
  ];

  return sections;
};
