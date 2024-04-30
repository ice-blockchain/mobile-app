// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {
  isAuthorizedSelector,
  userIsoCodeSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getErrorMessage} from '@utils/errors';
import {internationalPhoneNumber} from '@utils/phoneNumber';
import {runInChunks} from '@utils/promise';
import {Contact, getAll, PhoneNumber} from 'react-native-contacts';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getContactsSaga() {
  try {
    yield call(waitForSelector, state => {
      const hasPermissions = isPermissionGrantedSelector('contacts')(state);
      const isAuthorized = isAuthorizedSelector(state);
      const isAppActive = isAppActiveSelector(state);
      return hasPermissions && isAuthorized && isAppActive;
    });

    const user: User = yield select(userSelector);

    const isoCode: SagaReturnType<typeof userIsoCodeSelector> = yield select(
      userIsoCodeSelector,
    );

    const contacts: SagaReturnType<typeof getAll> = yield call(getAll);

    const filteredContacts: Contact[] = [];

    yield runInChunks(
      contacts,
      function (contact) {
        if (
          (
            (contact.givenName ?? '') +
            (contact.familyName ?? '') +
            (contact.middleName ?? '')
          ).trim() === ''
        ) {
          return;
        }

        let hasUserNumber = false;

        const userInternational = user.phoneNumber
          ? internationalPhoneNumber(user.phoneNumber, isoCode)
          : null;

        const validNumbers = isoCode
          ? contact.phoneNumbers.reduce(
              (validRecords: PhoneNumber[], record) => {
                if (record.number?.trim()?.length) {
                  const formatted = internationalPhoneNumber(
                    record.number,
                    isoCode,
                  );
                  if (formatted) {
                    if (userInternational && formatted === userInternational) {
                      hasUserNumber = true;
                    }
                    validRecords.push({number: formatted, label: record.label});
                  }
                }
                return validRecords;
              },
              [],
            )
          : contact.phoneNumbers;

        if (hasUserNumber) {
          return;
        }

        if (validNumbers.length > 0) {
          /**
           * If isoCode exists, we add the international number
           * with 'display' label to the contact
           */

          filteredContacts.push({
            ...contact,
            phoneNumbers: [...validNumbers],
          });
        }
      },
      200,
    );

    const sortedFilteredContacts = filteredContacts.sort(contactsComparator);

    yield put(
      ContactsActions.GET_CONTACTS.SUCCESS.create(sortedFilteredContacts),
    );
  } catch (error) {
    yield put(
      ContactsActions.GET_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}

function contactsComparator(c1: Contact, c2: Contact) {
  const displayName1 = ((c1.givenName || c1.familyName || c1.middleName) ?? '')
    .toLowerCase()
    .trim();
  const displayName2 = ((c2.givenName || c2.familyName || c2.middleName) ?? '')
    .toLowerCase()
    .trim();
  return displayName1.localeCompare(displayName2);
}
