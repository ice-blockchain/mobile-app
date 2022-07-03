// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {ContactById} from '@store/modules/Team/reducer';
import {getRandomColor} from '@utils/getRandomColor';
import {E164Number, parsePhoneNumberFromString} from 'libphonenumber-js';
import {isEmpty} from 'lodash';
import Contacts from 'react-native-contacts';
import {call, put} from 'redux-saga/effects';

export interface IFormattedContact {
  lastName: string;
  firstName: string;
  name: string;
  phoneNumbers: string[];
  id: string;
}

export interface IPhone {
  number: string;
}

export interface IContact {
  givenName: string;
  familyName: string;
  phoneNumbers: IPhone[];
  recordID: string;
}

export function* getContactsSaga() {
  try {
    const contactsList: IFormattedContact[] = [];
    const contacts: IContact[] = yield call(Contacts.getAllWithoutPhotos);
    contacts.forEach((contact: IContact) => {
      const firstName = contact.givenName || '';
      const lastName = contact.familyName || '';
      const name = firstName;
      if (!name || isEmpty(contact.phoneNumbers)) {
        return;
      }

      const numbers: E164Number[] = [];
      contact.phoneNumbers.forEach((phone: IPhone) => {
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
        contactsList.push({
          lastName,
          firstName,
          name,
          phoneNumbers: numbers,
          id: `contact_${contact.recordID}`,
        });
      }
    });

    const contactsByIds: ContactById = {};
    const contactIds: string[] = [];

    contactsList.forEach((contact: IFormattedContact) => {
      contactsByIds[contact.id] = {
        ...contact,
        isActive: false,
        backgroundColor: getRandomColor(),
      };
      contactIds.push(contact.id);
    });

    console.log(contactsByIds, contactIds, contactsList);

    yield put(TeamActions.SET_CONTACTS_BY_IDS.STATE.create(contactsByIds));
    yield put(TeamActions.SET_CONTACTS_IDS.STATE.create(contactIds));
    yield put(TeamActions.GET_CONTACTS.SUCCESS.create(contactsList));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.GET_CONTACTS.FAILED.create(errorMessage));
  }
}
