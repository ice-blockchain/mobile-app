// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {
  isAuthorizedSelector,
  userIdSelector,
  userSelector,
} from '@store/modules/Auth/selectors';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {TeamActions} from '@store/modules/Team/actions';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {
  call,
  put,
  SagaReturnType,
  select,
  SelectEffect,
  take,
} from 'redux-saga/effects';

function* readyToSync(): Generator<SelectEffect, boolean, boolean> {
  const hasPermissions: boolean = yield select(permissionSelector('contacts'));
  const isAuthorized: boolean = yield select(isAuthorizedSelector);
  const isAppActive: boolean = yield select(isAppActiveSelector);
  return hasPermissions && isAuthorized && isAppActive;
}

export function* syncContactsSaga() {
  try {
    while (!(yield* readyToSync())) {
      yield take('*');
    }

    const userId: SagaReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const user: SagaReturnType<typeof userSelector> = yield select(
      userSelector,
    );
    let contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
      getAllWithoutPhotos,
    );

    contacts = contacts
      .filter(c => c.phoneNumbers.length > 0)
      .sort((a, b) => a.givenName.localeCompare(b.givenName));

    const e164PhoneNumbers = contacts.reduce<string[]>((numbers, contact) => {
      return numbers.concat(
        contact.phoneNumbers.reduce<string[]>((contactNumbers, record) => {
          try {
            return [
              ...contactNumbers,
              e164PhoneNumber(record.number, user?.country),
            ];
          } catch {
            // skip number in case of error
            return contactNumbers;
          }
        }, []),
      );
    }, []);

    const phoneNumberHashes: string[] = yield Promise.all(
      e164PhoneNumbers.map(hashPhoneNumber),
    );

    const phoneNumberHashesString = phoneNumberHashes.join(',');
    if (phoneNumberHashesString !== user?.agendaPhoneNumberHashes) {
      yield call(Api.user.modifyUser, userId, {
        agendaPhoneNumberHashes: phoneNumberHashesString,
      });
    }

    yield put(TeamActions.SYNC_CONTACTS.SUCCESS.create(contacts));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.SYNC_CONTACTS.FAILED.create(errorMessage));
  }
}
