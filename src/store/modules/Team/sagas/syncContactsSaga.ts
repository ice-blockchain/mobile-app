// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Auth/selectors';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {TeamActions} from '@store/modules/Team/actions';
import {hashPhoneNumber} from '@utils/phoneNumber';
import {take} from 'lodash';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {
  call,
  put,
  SagaReturnType,
  select,
  SelectEffect,
} from 'redux-saga/effects';

function* readyToSync(): Generator<SelectEffect, boolean, boolean> {
  const hasPermissions: boolean = yield select(permissionSelector('contacts'));
  const isAuthorized: boolean = yield select(isAuthorizedSelector);
  return hasPermissions && isAuthorized;
}

export function* syncContactsSaga() {
  try {
    while (!(yield* readyToSync())) {
      yield take('*');
    }

    const userId: SagaReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    let contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
      getAllWithoutPhotos,
    );

    contacts = contacts
      .filter(c => c.phoneNumbers.length > 0)
      .sort((a, b) => a.givenName.localeCompare(b.givenName));

    const phoneNumberHashes: string[] = yield Promise.all(
      contacts.reduce(
        (numbers: Promise<string>[], contact) =>
          numbers.concat(
            contact.phoneNumbers.map(n => hashPhoneNumber(n.number)),
          ),
        [],
      ),
    );

    yield call(Api.user.modifyUser, userId, {
      agendaPhoneNumberHashes: phoneNumberHashes.join(','),
    });

    yield put(TeamActions.SYNC_CONTACTS.SUCCESS.create(contacts));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.SYNC_CONTACTS.FAILED.create(errorMessage));
  }
}
