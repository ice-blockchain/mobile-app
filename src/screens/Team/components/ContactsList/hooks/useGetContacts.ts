// SPDX-License-Identifier: BUSL-1.1

import {getContacts, IContact} from '@services/contacts';
import {TeamActions} from '@store/modules/Team/actions';
import {ContactById} from '@store/modules/Team/reducer';
import {
  getContactsIdsSelector,
  getIceFriendsSelector,
} from '@store/modules/Team/selectors';
import {getRandomColor} from '@utils/getRandomColor';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useGetContacts = () => {
  const iceFriends = useSelector(getIceFriendsSelector);
  const contactsIds = useSelector(getContactsIdsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!contactsIds.length) {
      getContactList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getContactList = async () => {
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
  };

  const sections = [
    {
      title: 'All contacts',
      data: contactsIds,
    },
  ];

  if (iceFriends.length) {
    sections.unshift({
      title: 'ice friends',
      data: iceFriends,
    });
  } else {
    sections.unshift({
      title: 'ice friends',
      data: ['InviteFriendsButton'],
    });
  }

  return sections;
};
