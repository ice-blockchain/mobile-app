// SPDX-License-Identifier: BUSL-1.1

import {getContacts, IContact} from '@services/contacts';
import {TeamActions} from '@store/modules/Team/actions';
import {ContactById} from '@store/modules/Team/reducer';
import {
  getContactsIdsSelector,
  getIceFriendsSelector,
} from '@store/modules/Team/selectors';
import {t} from '@translations/i18n';
import {getRandomColor} from '@utils/getRandomColor';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useGetContacts = () => {
  const iceFriends = useSelector(getIceFriendsSelector);
  const contactsIds = useSelector(getContactsIdsSelector);
  const dispatch = useDispatch();

  const getContactList = useCallback(async () => {
    const contactsList = await getContacts();

    const contactsByIds: ContactById = {};
    const contactIds: string[] = [];

    contactsList.forEach((contact: IContact) => {
      contactsByIds[contact.id] = {
        ...contact,
        isActive: false,
        backgroundColor: getRandomColor(),
      };
      contactIds.push(contact.id);
    });

    dispatch(TeamActions.SET_CONTACTS_BY_IDS.STATE.create(contactsByIds));
    dispatch(TeamActions.SET_CONTACTS_IDS.STATE.create(contactIds));
  }, [dispatch]);

  useEffect(() => {
    if (!contactsIds.length) {
      getContactList();
    }
  }, [contactsIds.length, getContactList]);

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
