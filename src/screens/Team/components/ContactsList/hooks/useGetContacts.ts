// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {
  getContactsIdsSelector,
  getIceFriendsSelector,
} from '@store/modules/Team/selectors';
import {t} from '@translations/i18n';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useGetContacts = () => {
  const iceFriends = useSelector(getIceFriendsSelector);
  const contactsIds = useSelector(getContactsIdsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!contactsIds.length) {
      dispatch(TeamActions.GET_CONTACTS.START.create());
    }
  }, [contactsIds.length, dispatch]);

  const sections = [
    {
      title: t('team.contacts_list.all_contacts'),
      data: contactsIds,
    },
  ];

  if (iceFriends.length) {
    sections.unshift({
      title: 'iceFriends',
      data: iceFriends,
    });
  } else {
    sections.unshift({
      title: 'iceFriends',
      data: ['InviteFriendsButton'],
    });
  }

  return sections;
};
