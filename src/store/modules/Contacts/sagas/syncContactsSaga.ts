// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {runInChunks} from '@utils/promise';
import {Contact, getAll} from 'react-native-contacts';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

function notNull<V>(value: V | null): value is V {
  return value !== null;
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

export function* syncContactsSaga() {
  try {
    yield call(waitForSelector, state => {
      const hasPermissions = isPermissionGrantedSelector('contacts')(state);
      const isAuthorized = isAuthorizedSelector(state);
      const isAppActive = isAppActiveSelector(state);
      return hasPermissions && isAuthorized && isAppActive;
    });

    const user: User = yield select(userSelector);
    const phoneNumberHashes = new Set(user.agendaPhoneNumberHashes?.split(','));

    const contacts: SagaReturnType<typeof getAll> = yield call(getAll);

    const agendaPhoneNumbers: string[] = [];
    const filteredContacts: Contact[] = contacts
      .map<Contact | null>((contact: Contact) => {
        if (
          contact.givenName.trim() === '' &&
          contact.familyName.trim() === '' &&
          contact.middleName.trim() === ''
        ) {
          return null;
        }

        let hasUserNumber = false;
        const validNumbers = contact.phoneNumbers.filter(record => {
          if (record.number?.trim()?.length) {
            const e164FormattedForHash = e164PhoneNumber(
              record.number,
              user.country,
            );
            if (e164FormattedForHash === user.phoneNumber) {
              hasUserNumber = true;
            }
            if (e164FormattedForHash) {
              agendaPhoneNumbers.push(e164FormattedForHash);
              return true;
            }
          }
          return false;
        });

        if (hasUserNumber) {
          return null;
        }
        if (validNumbers.length > 0) {
          return {...contact, phoneNumbers: validNumbers};
        }
        return null;
      })
      .filter(notNull)
      .sort(contactsComparator);

    const agendaPhoneNumberHashes: string[] = yield runInChunks(
      agendaPhoneNumbers,
      hashPhoneNumber,
      500,
    );

    const numberOfHashes = phoneNumberHashes.size;
    agendaPhoneNumberHashes.forEach(hash => phoneNumberHashes.add(hash));

    if (numberOfHashes !== phoneNumberHashes.size) {
      yield put(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            agendaPhoneNumberHashes: [...phoneNumberHashes].join(','),
          },
          function* (freshUser) {
            if (
              freshUser.agendaPhoneNumberHashes?.length !==
              user.agendaPhoneNumberHashes?.length
            ) {
              yield put(ContactsActions.SYNC_CONTACTS.START.create());
              return {retry: false};
            }
            return {retry: true};
          },
        ),
      );
    }

    yield put(ContactsActions.SYNC_CONTACTS.SUCCESS.create(filteredContacts));
  } catch (error) {
    yield put(
      ContactsActions.SYNC_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
