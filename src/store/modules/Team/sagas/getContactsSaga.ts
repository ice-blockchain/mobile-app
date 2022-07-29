// SPDX-License-Identifier: BUSL-1.1

import {isAuthorizedSelector} from '@store/modules/Auth/selectors';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {TeamActions} from '@store/modules/Team/actions';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getContactsSaga() {
  try {
    const hasPermissions: boolean = yield select(
      permissionSelector('contacts'),
    );
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );

    console.log('%c hasPermissions', 'background: #ff6347', hasPermissions);
    console.log('%c isAuthorized', 'background: #ff6347', isAuthorized);

    if (hasPermissions && isAuthorized) {
      let contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
        getAllWithoutPhotos,
      );

      contacts = contacts
        .filter(c => c.phoneNumbers.length > 0)
        .sort((a, b) => a.givenName.localeCompare(b.givenName));

      const phoneNumbers = contacts.reduce(
        (numbers: string[], contact) =>
          numbers.concat(contact.phoneNumbers.map(n => n.number)),
        [],
      );

      console.log('%c phoneNumbers', 'background: #ff6347', phoneNumbers);

      yield put(TeamActions.GET_CONTACTS.SUCCESS.create(contacts));
    }
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.GET_CONTACTS.FAILED.create(errorMessage));
  }
}
