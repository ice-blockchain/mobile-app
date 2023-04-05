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
import {call, fork, put, SagaReturnType, select} from 'redux-saga/effects';

export function* syncContactsSaga() {
  try {
    yield call(waitForSelector, state => {
      const hasPermissions = isPermissionGrantedSelector('contacts')(state);
      const isAuthorized = isAuthorizedSelector(state);
      const isAppActive = isAppActiveSelector(state);
      return hasPermissions && isAuthorized && isAppActive;
    });

    const user: User = yield select(userSelector);

    const contacts: SagaReturnType<typeof getAll> = yield call(getAll);

    const agendaPhoneNumbers: string[] = [];
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
          return;
        }

        if (validNumbers.length > 0) {
          filteredContacts.push({
            ...contact,
            phoneNumbers: validNumbers,
          });
        }
      },
      200,
    );

    const sortedFilteredContacts = filteredContacts.sort(contactsComparator);

    yield fork(updateAgendaPhoneNumberHashes, agendaPhoneNumbers, user);

    yield put(
      ContactsActions.SYNC_CONTACTS.SUCCESS.create(sortedFilteredContacts),
    );
  } catch (error) {
    yield put(
      ContactsActions.SYNC_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}

function* updateAgendaPhoneNumberHashes(
  agendaPhoneNumbers: string[],
  user: User,
): Generator<unknown, void, string[]> {
  const phoneNumberHashes = new Set(user.agendaPhoneNumberHashes?.split(','));

  const agendaPhoneNumberHashes: string[] = yield runInChunks(
    agendaPhoneNumbers,
    hashPhoneNumber,
    200,
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
            yield call(
              updateAgendaPhoneNumberHashes,
              agendaPhoneNumberHashes,
              freshUser,
            );
            return {retry: false};
          }
          return {retry: true};
        },
      ),
    );
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
