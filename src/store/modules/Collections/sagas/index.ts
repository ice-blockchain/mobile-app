// SPDX-License-Identifier: ice License 1.0

import {CollectionActions} from '@store/modules/Collections';
import {takeLatest} from 'redux-saga/effects';

import {getCollectionSaga} from './getCollectionSaga';

export const collectionsWatchers = Object.values(CollectionActions).map(
  action => takeLatest(action.START.type, getCollectionSaga, action),
);
