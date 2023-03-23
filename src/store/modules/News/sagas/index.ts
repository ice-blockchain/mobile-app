// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {NewsActions} from '@store/modules/News/actions';
import {takeLatestEveryUnique} from '@store/utils/sagas/effects';
import {all, takeLatest, takeLeading} from 'redux-saga/effects';

import {loadNewsSaga} from './loadNewsSaga';
import {loadUnreadNewsCountSaga} from './loadUnreadNewsCountSaga';
import {markViewedNewsArticleSaga} from './markViewedNewsArticleSaga';

export function* rootNewsSaga() {
  yield all([
    takeLatest(NewsActions.NEWS_LOAD.START.type, loadNewsSaga),

    takeLeading(
      [
        NewsActions.UNREAD_NEWS_COUNT_LOAD.START.type,
        AppCommonActions.INTERVAL_UPDATE.STATE.type,
        NewsActions.NEWS_ARTICLE_MARK_VIEWED(null).SUCCESS.type,
      ],
      loadUnreadNewsCountSaga,
    ),

    takeLatestEveryUnique(
      NewsActions.NEWS_ARTICLE_MARK_VIEWED(null).START.type,
      markViewedNewsArticleSaga,
    ),
  ]);
}
