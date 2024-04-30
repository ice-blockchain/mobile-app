// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {NewsArticle} from '@api/news/types';
import {
  appLocaleSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {NewsActions} from '@store/modules/News/actions';
import {NewsSelectors} from '@store/modules/News/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export const NEWS_LOAD_LIMIT = 10;

export function* loadNewsSaga(
  action: ReturnType<typeof NewsActions.NEWS_LOAD.START.create>,
) {
  const {isInitial} = action.payload;

  const user: SagaReturnType<typeof userSelector> = yield select(userSelector);

  const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
    appLocaleSelector,
  );

  const pageNumber: SagaReturnType<typeof NewsSelectors.pageNumber> =
    yield select(NewsSelectors.pageNumber);
  const nextPageNumber = isInitial ? 0 : pageNumber + 1;
  try {
    const {data: news}: SagaReturnType<typeof Api.news.getNews> = yield call(
      Api.news.getNews,
      {
        type: 'regular',
        language: locale,
        limit: NEWS_LOAD_LIMIT,
        offset: nextPageNumber * NEWS_LOAD_LIMIT,
        createdAfter: user?.createdAt,
      },
    );

    let featuredNewsArticle: NewsArticle | undefined;

    if (isInitial) {
      // Load 1 featured news article only for refresh event
      const {data: featuredNews}: SagaReturnType<typeof Api.news.getNews> =
        yield call(Api.news.getNews, {
          type: 'featured',
          language: locale,
          limit: 1,
          offset: 0,
          createdAfter: user?.createdAt,
        });

      featuredNewsArticle = featuredNews[0];
    }

    yield put(
      NewsActions.NEWS_LOAD.SUCCESS.create({
        pageNumber: nextPageNumber,

        hasMore: !!news.length,

        featuredNewsArticle,

        newsIds: news.map(({id}) => id),
        news: news.reduce<{
          [newsArticleId: string]: typeof news[0];
        }>(
          (previousValue, currentValue) => ({
            ...previousValue,
            [currentValue.id]: currentValue,
          }),
          {},
        ),
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(NewsActions.NEWS_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
