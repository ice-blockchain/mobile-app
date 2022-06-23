// SPDX-License-Identifier: BUSL-1.1

import {E164Number, parsePhoneNumberFromString} from 'libphonenumber-js';
import {isEmpty} from 'lodash';
import RNContacts from 'react-native-contacts';
import RNPermissions, {PERMISSIONS} from 'react-native-permissions';
import {isIOS} from 'rn-units';

interface IContact {
  lastName: string;
  firstName: string;
  name: string;
  phoneNumbers: string[];
  id: string;
}
export const getContacts = async (): Promise<Array<IContact>> => {
  const formatted: IContact[] = [];
  const contacts = await RNContacts.getAllWithoutPhotos().catch(() => []);
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
  const permission = await RNPermissions.check(contactsPermission);
  return permission === 'granted';
  // return permissionsHelpers.isGranted(permission);
};

export const requestContactsAccessPermission = async () => {
  const permission = await RNPermissions.request(contactsPermission);
  return permission === 'granted';
  // return permissionsHelpers.isGranted(permission);
};

export const hasContactsAccessDeclined = async () => {
  const permission = await RNPermissions.request(contactsPermission);
  return permission === 'blocked';
  // return permissionsHelpers.isRejected(permission);
};
