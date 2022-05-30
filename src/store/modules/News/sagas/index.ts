// SPDX-License-Identifier: BUSL-1.1

import {NewsActions} from '@store/modules/News/actions';
import {takeLatestEveryUnique} from '@store/utils/sagas/effects';
import {all, takeLeading} from 'redux-saga/effects';

import {loadNewsPostSaga} from './loadNewsPostSaga';
import {loadNewsSaga} from './loadNewsSaga';

export function* rootNewsSaga() {
  yield all([
    takeLatestEveryUnique(
      NewsActions.NEWS_POST_LOAD(null).START.type,
      loadNewsPostSaga,
    ),

    takeLeading(NewsActions.NEWS_LOAD.START.type, loadNewsSaga),
  ]);
}
