// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {ContactById} from '@store/modules/Team/reducer';
import {getRandomColor} from '@utils/getRandomColor';
import {E164Number, parsePhoneNumberFromString} from 'libphonenumber-js';
import {isEmpty} from 'lodash';
import Contacts from 'react-native-contacts';
import {call, put} from 'redux-saga/effects';

const mockContacts = [
  {
    firstName: 'Alice',
    name: 'Alice',
    lastName: '',
    phoneNumbers: ['+4 0728128471', '+4 0721005330', '+4 0728899080'],
    id: 'contact_1',
  },
  {
    firstName: 'Aerial',
    name: 'Aerial',
    lastName: 'Nocta',
    phoneNumbers: ['+4 0711774775'],
    id: 'contact_2',
  },
  {
    firstName: 'Ada',
    name: 'Ada',
    lastName: 'Dwight Beasly',
    phoneNumbers: ['+4 0728069967'],
    id: 'contact_3',
  },
  {
    firstName: 'Alexis',
    name: 'Alexis',
    lastName: 'Morrison',
    phoneNumbers: ['+4 0728128471'],
    id: 'contact_4',
  },
  {
    firstName: 'Alexander',
    name: 'Alexander',
    lastName: 'Vermillion',
    phoneNumbers: ['+4 0766214532'],
    id: 'contact_5',
  },
  {
    firstName: 'Beatrice',
    name: 'Beatrice',
    lastName: 'Mistral',
    phoneNumbers: ['+4 0745877590'],
    id: 'contact_6',
  },
  {
    firstName: 'Bernard',
    name: 'Bernard',
    lastName: 'Belgique',
    phoneNumbers: ['+4 0736221547'],
    id: 'contact_7',
  },
  {
    firstName: 'Boris',
    name: 'Boris',
    lastName: 'Sollmyr',
    phoneNumbers: ['+4 0718334592'],
    id: 'contact_8',
  },
];

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
    let contactsList: IFormattedContact[] = [];
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
              const internationalPhoneNumber =
                phoneNumber.formatInternational();
              const [coutryCode, prefix, ...restNumber] =
                internationalPhoneNumber.split(' ');
              const number = restNumber.join(' ');
              numbers.push(`${coutryCode} (${prefix}) ${number}`);
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

    contactsList = contactsList.sort((a, b) =>
      a.firstName.localeCompare(b.firstName),
    );

    const contactArray = contactsList.length ? contactsList : mockContacts;

    contactArray.forEach((contact: IFormattedContact) => {
      contactsByIds[contact.id] = {
        ...contact,
        isActive: false,
        backgroundColor: getRandomColor(),
      };
      contactIds.push(contact.id);
    });

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
