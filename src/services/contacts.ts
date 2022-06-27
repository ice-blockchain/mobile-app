// SPDX-License-Identifier: BUSL-1.1

import {E164Number, parsePhoneNumberFromString} from 'libphonenumber-js';
import {isEmpty} from 'lodash';
import Contacts from 'react-native-contacts';
import Permissions, {PERMISSIONS, RESULTS} from 'react-native-permissions';
import {isIOS} from 'rn-units';

export interface IContact {
  lastName: string;
  firstName: string;
  name: string;
  phoneNumbers: string[];
  id: string;
}
export const getContacts = async (): Promise<Array<IContact>> => {
  const formatted: IContact[] = [];
  const contacts = await Contacts.getAllWithoutPhotos().catch(() => []);
  contacts.forEach(contact => {
    const firstName = contact.givenName || '';
    const lastName = contact.familyName || '';
    const name = firstName;
    if (!name || isEmpty(contact.phoneNumbers)) {
      return;
    }

    const numbers: E164Number[] = [];
    contact.phoneNumbers.forEach(phone => {
      if (phone && phone.number) {
        const formatedNumber = phone.number;
        if (formatedNumber) {
          const phoneNumber = parsePhoneNumberFromString(formatedNumber);
          if (phoneNumber) {
            numbers.push(phoneNumber.number);
          }
        }
      }
    });

    if (!isEmpty(numbers)) {
      formatted.push({
        lastName,
        firstName,
        name,
        phoneNumbers: numbers,
        id: `contact_${contact.recordID}`,
      });
    }
  });

  return formatted;
};

export const contactsPermission = isIOS
  ? PERMISSIONS.IOS.CONTACTS
  : PERMISSIONS.ANDROID.READ_CONTACTS;

export const hasContactsAccessPermission = async () => {
  const permission = await Permissions.check(contactsPermission);
  return permission === RESULTS.GRANTED;
};

export const requestContactsAccessPermission = async () => {
  const permission = await Permissions.request(contactsPermission);
  return permission === RESULTS.GRANTED;
};

export const hasContactsAccessDeclined = async () => {
  const permission = await Permissions.request(contactsPermission);
  return permission === RESULTS.DENIED;
};
