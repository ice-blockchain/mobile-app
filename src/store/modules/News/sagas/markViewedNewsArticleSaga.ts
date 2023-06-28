// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {NewsActions} from '@store/modules/News/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = NewsActions.NEWS_ARTICLE_MARK_VIEWED(null).START.create;

export function* markViewedNewsArticleSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {newsId, language} = action.payload;

  const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
    appLocaleSelector,
  );

  try {
    yield call(Api.news.markViewed, {
      language: language ?? locale,
      newsId,
    });

    yield put(
      NewsActions.NEWS_ARTICLE_MARK_VIEWED(action.id).SUCCESS.create({
        newsId,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(
      NewsActions.NEWS_ARTICLE_MARK_VIEWED(action.id).FAILED.create(
        errorMessage,
      ),
    );

    throw error;
  }
}
