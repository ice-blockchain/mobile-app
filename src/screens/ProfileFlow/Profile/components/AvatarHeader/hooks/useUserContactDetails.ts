// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {userIsoCodeSelector} from '@store/modules/Account/selectors';
import {contactsSelector} from '@store/modules/Contacts/selectors';
import {internationalPhoneNumber} from '@utils/phoneNumber';
import {useEffect, useState} from 'react';
import {Contact} from 'react-native-contacts';
import {useSelector} from 'react-redux';

export const useUserContactDetails = ({user}: {user: User | null}) => {
  const contacts = useSelector(contactsSelector);
  const [contactDetails, setContactDetails] = useState<Contact>();
  const isoCode = useSelector(userIsoCodeSelector);
  const userNumberFormatted = user?.phoneNumber
    ? internationalPhoneNumber(user.phoneNumber, isoCode)
    : null;

  useEffect(() => {
    if (userNumberFormatted && contacts?.length > 0) {
      const userContactDetails = contacts.find(contact => {
        return contact.phoneNumbers.find(phoneNumber => {
          return phoneNumber.number === userNumberFormatted;
        });
      });
      if (userContactDetails) {
        setContactDetails(userContactDetails);
      }
    }
  }, [contacts, userNumberFormatted]);

  return {contactDetails};
};
