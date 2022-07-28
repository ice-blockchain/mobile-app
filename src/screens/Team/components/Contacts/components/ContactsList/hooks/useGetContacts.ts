// SPDX-License-Identifier: BUSL-1.1

import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {TeamActions} from '@store/modules/Team/actions';
import {contactsSelector} from '@store/modules/Team/selectors';
import {t} from '@translations/i18n';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useGetContacts = (focused: boolean) => {
  const userId = useSelector(userIdSelector);
  const contacts = useSelector(contactsSelector);
  const referrals = useSelector(referralsSelector(userId, 'CONTACTS'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (focused) {
      dispatch(TeamActions.GET_CONTACTS.START.create());
      //TODO::add Contacts->BE sync, dispatch on app startup, state change
      dispatch(
        ReferralsActions.GET_REFERRALS('CONTACTS').START.create(
          userId,
          'CONTACTS',
          0,
        ),
      );
    }
  }, [dispatch, userId, focused]);

  const sections = [
    {
      title: 'iceFriends',
      data: !referrals?.total ? ['InviteFriendsButton'] : referrals.referrals,
    },
    {
      title: t('team.contacts_list.all_contacts'),
      data: contacts,
    },
  ];

  return sections;
};
