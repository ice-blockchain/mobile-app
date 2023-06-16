// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, internationalPhoneNumber} from '@utils/phoneNumber';
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

    const isoCode = user?.clientData?.phoneNumberIso ?? null;

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

        const validNumbers = contact.phoneNumbers.filter(record => {
          if (record.number?.trim()?.length) {
            const e164FormattedPhoneNumber = e164PhoneNumber(
              record.number,
              user.country,
            );
            if (e164FormattedPhoneNumber) {
              if (e164FormattedPhoneNumber === user.phoneNumber) {
                hasUserNumber = true;
              }
              return true;
            }
          }
          return false;
        });

        if (hasUserNumber) {
          return;
        }

        if (validNumbers.length > 0) {
          /**
           * If isoCode exists, we add the international number
           * with 'display' label to the contact
           */
          const validNumbersWithDisplayLabel: PhoneNumber[] = isoCode
            ? validNumbers.reduce(
                (accumulator: PhoneNumber[], record: PhoneNumber) => {
                  const international = internationalPhoneNumber(
                    record.number,
                    isoCode,
                  );
                  if (international) {
                    accumulator.push({
                      label: 'display',
                      number: international,
                    });
                  }

                  return accumulator;
                },
                [],
              )
            : [];
          filteredContacts.push({
            ...contact,
            phoneNumbers: [...validNumbers, ...validNumbersWithDisplayLabel],
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
