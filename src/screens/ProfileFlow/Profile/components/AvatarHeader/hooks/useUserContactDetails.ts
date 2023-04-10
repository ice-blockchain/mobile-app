// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {contactsSelector} from '@store/modules/Contacts/selectors';
import {e164PhoneNumber} from '@utils/phoneNumber';
import {useEffect, useState} from 'react';
import {Contact} from 'react-native-contacts';
import {useSelector} from 'react-redux';

export const useUserContactDetails = ({user}: {user: User | null}) => {
  const contacts = useSelector(contactsSelector);
  const [contactDetails, setContactDetails] = useState<Contact>();

  useEffect(() => {
    if (user && user.phoneNumber && contacts?.length > 0) {
      const userContactDetails = contacts.find(contact => {
        return contact.phoneNumbers.find(phoneNumber => {
          const normalizedNumber = e164PhoneNumber(
            phoneNumber.number,
            user.country,
          );
          return normalizedNumber === user.phoneNumber;
        });
      });
      if (userContactDetails) {
        setContactDetails(userContactDetails);
      }
    }
  }, [contacts, user]);

  return {contactDetails};
};
