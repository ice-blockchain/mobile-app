// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {contactsSelector} from '@store/modules/Team/selectors';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {useEffect} from 'react';
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
    {
      id: 'contacts',
      title: t('team.contacts_list.all_contacts'),
      data: contacts,
    },
  ];

  return sections;
};
