// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* getContactsSaga() {
  try {
    let contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
      getAllWithoutPhotos,
    );

    contacts = contacts
      .filter(c => c.phoneNumbers.length > 0)
      .sort((a, b) => a.givenName.localeCompare(b.givenName));

    yield put(TeamActions.GET_CONTACTS.SUCCESS.create(contacts));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.GET_CONTACTS.FAILED.create(errorMessage));
  }
}
