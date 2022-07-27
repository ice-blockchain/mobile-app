// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {getContactsSelector} from '@store/modules/Team/selectors';
import {t} from '@translations/i18n';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useGetContacts = () => {
  const contacts = useSelector(getContactsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TeamActions.GET_CONTACTS.START.create());
  }, [dispatch]);

  const sections = [
    {
      title: 'iceFriends',
      data: ['InviteFriendsButton'],
    },
    {
      title: t('team.contacts_list.all_contacts'),
      data: contacts, //TODO::filter out friends
    },
  ];

  return sections;
};
