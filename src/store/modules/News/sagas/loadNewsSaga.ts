// SPDX-License-Identifier: BUSL-1.1

import {put, select} from 'redux-saga/effects';
// import AuthSelectors from 'src/modules/Auth/selectors';
// import Api from 'src/api';
// import {ApiNews, LIMIT} from 'src/api/news/getNews';
// import NewsSelectors from '../selectors';
import {NewsActions} from '../actions';
import {NewsPost} from '@store/types';

export function* loadNewsSaga(
  action: ReturnType<typeof NewsActions.NEWS_LOAD.START.create>,
) {
  const {isRefresh} = action.payload;

  //TODO: connecte API
  // const searchQuery: string = yield select(NewsSelectors.getSearchQuery);
  // const newsPostIds: string[] = yield select(
  //   NewsSelectors.getNewsPostsByIds,
  // );

  try {
    // const response: ApiNews = yield Api.news.getNews({
    //   page: isRefresh ? 0 : Math.floor(newsPostIds.length / LIMIT),
    //   searchQuery,
    // });

    const newsPostsByIds: {
      [key: string]: NewsPost;
    } = {};

    const response = {};
    response.news = [];
    response.hasNextPage = false;

    response.news.forEach(newsPost => {
      newsPostsByIds[newsPost.postId] = newsPost;
    });

    yield put(
      NewsActions.NEWS_LOAD.SUCCESS.create({
        isRefresh,
        news: newsPostsByIds,
        hasMore: response.hasNextPage,
      }),
    );
  } catch (error) {
    yield put(NewsActions.NEWS_LOAD.FAILED.create(error.message));
  }
}
