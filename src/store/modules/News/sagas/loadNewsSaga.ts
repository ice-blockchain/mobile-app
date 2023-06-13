// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {NewsArticle} from '@api/news/types';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {NewsActions} from '@store/modules/News/actions';
import {NewsSelectors} from '@store/modules/News/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export const NEWS_LOAD_LIMIT = 10;

export function* loadNewsSaga(
  action: ReturnType<typeof NewsActions.NEWS_LOAD.START.create>,
) {
  const {isRefresh} = action.payload;

  const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
    appLocaleSelector,
  );

  const newsIds: SagaReturnType<typeof NewsSelectors.getNewsIds> = yield select(
    NewsSelectors.getNewsIds,
  );

  try {
    const news: SagaReturnType<typeof Api.news.getNews> = yield call(
      Api.news.getNews,
      {
        type: 'regular',
        language: locale,
        limit: NEWS_LOAD_LIMIT,
        offset: isRefresh ? 0 : newsIds.length,
      },
    );

    let featuredNewsArticle: NewsArticle | undefined;

    if (isRefresh) {
      // Load 1 featured news article only for refresh event
      const featuredNews: SagaReturnType<typeof Api.news.getNews> = yield call(
        Api.news.getNews,
        {
          type: 'featured',
          language: locale,
          limit: 1,
          offset: 0,
        },
      );

      featuredNewsArticle = featuredNews[0];
    }

    yield put(
      NewsActions.NEWS_LOAD.SUCCESS.create({
        isRefresh,

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
