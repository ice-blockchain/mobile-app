// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {mockContacts} from '@store/modules/Team/sagas/mockContacts';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* getContactsSaga() {
  try {
    const contacts: SagaReturnType<typeof getAllWithoutPhotos> = __DEV__
      ? mockContacts
      : yield call(getAllWithoutPhotos);

    contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));

    yield put(TeamActions.GET_CONTACTS.SUCCESS.create(contacts));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.GET_CONTACTS.FAILED.create(errorMessage));
  }
}
