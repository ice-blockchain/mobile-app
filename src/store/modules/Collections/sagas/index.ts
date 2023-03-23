// SPDX-License-Identifier: ice License 1.0

import {CollectionActions} from '@store/modules/Collections';
import {all, takeLatest} from 'redux-saga/effects';

import {getCollectionSaga} from './getCollectionSaga';

export function* rootCollectionsSaga() {
  yield all(
    Object.values(CollectionActions).map(action =>
      takeLatest(action.START.type, getCollectionSaga, action),
    ),
  );
}
